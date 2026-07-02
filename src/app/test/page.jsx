import CustomParallaxImages from "@/components/customParallaxImages/CustomParallaxImages";

export default function Page() {
    return (
        <main className="min-h-[250vh] bg-slate-100 py-24">

            <div className="mx-auto w-[900px]">

                <div className="aspect-[1/1] w-full">

                    <CustomParallaxImages

                        images={[
                            "/assets/customParallaxImage/cpp-default-hero.png",
                            "/assets/gallery/g-1.png",
                            "/assets/customParallaxImage/cpp-default-hero.png",
                            "/assets/gallery/g-1.png",
                        ]} />

                </div>

            </div>

        </main>
    );
}