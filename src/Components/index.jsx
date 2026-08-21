import About from "./about";
import Footer from "./footer";
import Hero from "./hero";
import Navbar from "./navbar";
import ProductCarousel from "./ProductCarousel";

export default function Index() {

    return (
        <div>
            <Navbar />
            <Hero />
            <About />
                  <ProductCarousel categoryId={1} />
            
            <ProductCarousel categoryId={2} />
            <Footer />
        </div>
    );
} 