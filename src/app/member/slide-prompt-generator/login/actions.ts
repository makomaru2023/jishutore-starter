"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_PATH = "/member/slide-prompt-generator";
const COOKIE_NAME = "slide_prompt_access";
const MAX_AGE = 60 * 60 * 24 * 30; // 30日

export interface LoginState {
  error: string | null;
}

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = formData.get("password");
  const expectedPassword = process.env.SLIDE_PROMPT_PASSWORD;
  const cookieValue = process.env.SLIDE_PROMPT_COOKIE_VALUE;

  if (
    !expectedPassword ||
    !cookieValue ||
    typeof password !== "string" ||
    password !== expectedPassword
  ) {
    return { error: "パスワードが違います。" };
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: BASE_PATH,
    maxAge: MAX_AGE,
  });

  redirect(BASE_PATH);
}
