// FEE
import { AssignFeeModal } from "@/app/dashboard/utils/fee/_components/create-fee-modal"
import { UpdateFeeModal } from "@/app/dashboard/utils/fee/_components/update-fee-modal"
import { DeleteFeeModal } from "@/app/dashboard/utils/fee/_components/delete-fee-modal"

// COUPON
import { AssignCouponModal } from "@/app/dashboard/utils/coupon/_components/create-coupon-modal"
import { UpdateCouponModal } from "@/app/dashboard/utils/coupon/_components/update-coupon-modal"
import { DeleteCouponModal } from "@/app/dashboard/utils/coupon/_components/delete-coupon-modal"


export const ModalProvider = () => {
    return (
        <>
            {/* FEE */}
            <AssignFeeModal />
            <UpdateFeeModal />
            <DeleteFeeModal />

            {/* COUPON */}
            <AssignCouponModal />
            <UpdateCouponModal />
            <DeleteCouponModal />
        </>
    )
}