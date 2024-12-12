

const LandingHero = () => {
    
    return(
        <section className="flex flex-col lg:flex-row items-center justify-between px-10 py-16 lg:py-24 lg:h-screen bg-[#E5FAC0]">

            {/* Left Side */}
            <div className="lg:w-1/2 mt-8 lg:mt-0 w-full">

                {/* Hero Image */}
                <img
                    src="logo-greenify.png"
                    alt="brand-logo"
                    className="w-full h-auto mx-auto lg:mx-0"
                />

            </div>

            {/* Right Side */}
            <div className="lg:w-1/2 text-center lg:text-left space-y-6">

                {/* Hero Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-[#070707]">Reuse What You Can, Recycle What You Can’t</h1>

                {/* Hèro Description */}
                <p className="lg:text-2xl text-xl text-[#070707]">
                    <b>Eco-sustainable</b> All recyclable materials, 0% CO2 emissions <br/>
                    <b>Hyphoallergenic</b> 100% natural, human friendly ingredients <br/>
                    <b>Long burning</b> No more waste. Created for last long.
                </p>
                
                {/* Hero Button */}
                <div className="space-x-4">
                    <button className="px-4 py-3 bg-[#56B280] text-white font-semibold rounded-lg shadow hover:bg-blue-500">
                        Learn More
                    </button>
                </div>

            </div>

        </section>
    )
}

export default LandingHero