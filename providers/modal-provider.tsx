// FEE
import { AssignFeeModal } from "@/app/dashboard/utils/fee/_components/create-fee-modal"
import { UpdateFeeModal } from "@/app/dashboard/utils/fee/_components/update-fee-modal"
import { DeleteFeeModal } from "@/app/dashboard/utils/fee/_components/delete-fee-modal"

// COUPON
import { AssignCouponModal } from "@/app/dashboard/utils/coupon/_components/create-coupon-modal"
import { UpdateCouponModal } from "@/app/dashboard/utils/coupon/_components/update-coupon-modal"
import { DeleteCouponModal } from "@/app/dashboard/utils/coupon/_components/delete-coupon-modal"

// SCOUT
import { ScoutStatusModal } from "@/app/dashboard/scout/request/_components/status-modal"
import { DeleteScoutModal } from "@/app/dashboard/scout/request/_components/delete-modal"
import { ScoutCardModal } from "@/app/dashboard/scout/_components/card-modal"
import { RemoveScoutModal } from "@/app/dashboard/unit/[id]/_components/remove-scout-modal"

// UNIT
import { AssignUnitLeaderModal } from "@/app/dashboard/unit/[id]/_components/assign-leader-modal"
import { RemoveLeaderModal } from "@/app/dashboard/unit/[id]/_components/remove-leader-modal"
import { MigrationModal } from "@/app/dashboard/unit/[id]/_components/migration-modal"


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

            {/* SCOUT */}
            <ScoutStatusModal />
            <DeleteScoutModal />
            <ScoutCardModal />
            <RemoveScoutModal />

            {/* UNIT */}
            <AssignUnitLeaderModal />
            <RemoveLeaderModal />
            <MigrationModal />
        </>
    )
}