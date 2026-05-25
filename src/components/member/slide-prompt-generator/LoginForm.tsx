"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login, type LoginState } from "@/app/member/slide-prompt-generator/login/actions";

const initialState: LoginState = { error: null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 py-3.5 text-base font-black text-white shadow-md shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
    >
      {pending ? "確認中..." : "利用を開始する"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-bold text-slate-700"
        >
          パスワード
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base font-medium text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {state.error && (
        <p className="text-sm font-bold text-rose-500">{state.error}</p>
      )}

      <SubmitButton />
    </form>
  );
}
