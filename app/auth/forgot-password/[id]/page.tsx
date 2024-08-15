import { VerifyForm } from "./_components/verify-form";

interface Props {
    params: {
        id: string;
    }
}

const VerifyPage = ({params:{id}}:Props) => {
    return <VerifyForm id={id} />
}

export default VerifyPage