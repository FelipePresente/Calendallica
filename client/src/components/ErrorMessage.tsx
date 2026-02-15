export interface ErrorMessageProps {
    errorText: string
}

export default function ErrorMessage({ errorText }: ErrorMessageProps) {
    return (
        <div
            className="left-0 -top-16 text-center py-3 px-5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl font-medium">
            {errorText}
        </div>
    )
}