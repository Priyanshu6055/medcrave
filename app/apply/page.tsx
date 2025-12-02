"use client";
import BannerWrapper from "@/components/about/AboutBannerWrapper";
import ApplyForm from "@/components/forms/ApplyForm";

export default function ApplyPage() {
    return (

        <>
            <BannerWrapper
                heading="Apply Form"
                subtitle="We’d love to hear from you. Reach out for support, queries, or collaborations."
            />

            <div className="container-global py-10 h-70vh">
                <ApplyForm />
            </div>

        </>

    );
};