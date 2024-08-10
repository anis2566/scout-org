import { Metadata } from "next";
import { ChatPage } from "./_components/chat-page";
import { ContentLayout } from "../_components/content-layout";
import { Suspense } from "react";
import { Loader } from "@/components/loader";

export const metadata: Metadata = {
    title: "APBn Scouts | Support",
    description: "Apbn scouts group",
};

const Support = () => {
    return (
        <ContentLayout title="Support">
            <Suspense fallback={<Loader />}>
                <ChatPage />
            </Suspense>
        </ContentLayout>
    )

}

export default Support
