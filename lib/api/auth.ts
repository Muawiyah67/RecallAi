import type {
  ForgotPasswordValues,
  LoginValues,
  ResetPasswordValues,
} from "@/lib/validations/auth"

// Points at your NestJS API. Set NEXT_PUBLIC_API_URL once that service is deployed.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"

type SignupPayload = {
  name: string
  email: string
  password: string
}

async function parseErrorMessage(res: Response, fallback: string) {
  const body = await res.json().catch(() => null)
  return body?.message ?? fallback
}

// Talks to NestJS, which is expected to own the actual Supabase auth call and
// set a session cookie on response — credentials: "include" keeps that cookie
// flowing on subsequent requests. Swap this for a client-side Supabase call
// instead if you decide to skip the NestJS hop for auth specifically.
export async function loginRequest(values: LoginValues) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(values),
  })

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Invalid email or password"))
  }

  return res.json()
}

export async function signupRequest(values: SignupPayload) {
  const res = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(values),
  })

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Couldn't create your account"))
  }

  return res.json()
}

// Clears the session cookie server-side. Call this, then redirect — don't try
// to clear an httpOnly cookie from client JS, it can't see it.
export async function logoutRequest() {
  const res = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  })

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Couldn't log out"))
  }
}

export async function forgotPasswordRequest(values: ForgotPasswordValues) {
  const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  })

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Couldn't send the reset link"))
  }
}

// token comes from the query string on the link Supabase emails out —
// see app/(auth)/reset-password/page.tsx for where it's read.
export async function resetPasswordRequest(values: ResetPasswordValues, token: string) {
  const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: values.password, token }),
  })

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Couldn't reset your password"))
  }
}