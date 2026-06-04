import LoginHeroImage from "../../assets/login-left-image-mask.png";
import Header from "../../components/layout/Header/Header";
import "./style.css";

const Landing = () => {
  return (
    <main className="landing-layout">
      <Header />
      <section className="landing-content">
        <div className="landing-left-container center">
          <div className="landing-left-image-container w-full center">
            <img className="landing-left-image" src={LoginHeroImage} />
          </div>
        </div>

        <div className="landing-right-container ">
          <div>
            <h1>KeyValue</h1>
            <p>Employee Application</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Landing;
