interface Props {
    code: string;
}

export const VerifyEmail = ({code}:Props) => {
    return (
        <div className="w-full max-w-xl border mx-auto p-2 rounded-md space-y-6">
            <h1 className="text-center text-2xl font-bold text-primary">APBn Scouts</h1>
            <p className="text-center text-muted-foreground">Enter this verification code to complete your registration</p>
            <h3 className="tracking-widest text-3xl font-bold text-center">{code}</h3>
        </div>
    )
}