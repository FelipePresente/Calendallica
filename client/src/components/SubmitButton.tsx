export interface SubmitButtonProps {
    value: string,
    disabled?: string | boolean
}

export default function SubmitButton({ value, disabled }: SubmitButtonProps) {
    const isDisabled = String(disabled) === "true"

    return (
        <input
            disabled={isDisabled}
            className="flex justify-center items-center rounded-xl cursor-pointer text-zinc-50 font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed disabled:shadow-none shadow-md md:shadow-2xl shadow-indigo-500/25 py-5 mt-5 border border-zinc-800 transition-all"
            type="submit"
            value={value}
        />
    )
}