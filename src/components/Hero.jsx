import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-ref" id="home">
      <div className="container hero-layout-ref">
        <div className="hero-text-ref">
          <h1 className="hero-headline">
            Fueled by <span className="accent">code</span>, late nights & <span className="accent">passion</span>.
          </h1>
          <p className="hero-subtext">
            클라이언트의 마음을 읽어내는 백엔드 개발자. <br />
            더 견고하고 효율적인 시스템 아키텍처를 설계합니다.
          </p>
        </div>
        
        <div className="hero-banner-ref glass-panel">
          <div className="banner-header">
            <div className="dot red"></div>
            <div className="dot yellow"></div>
            <div className="dot green"></div>
            <span className="banner-title">PortfolioController.java</span>
          </div>
          <code>
            <span className="code-p">@RestController</span><br />
            <span className="code-k">public class</span> <span className="code-c">PortfolioController</span> &#123;<br />
            &nbsp;&nbsp;<span className="code-p">@GetMapping</span>(<span className="code-s">"/api/dev"</span>)<br />
            &nbsp;&nbsp;<span className="code-k">public</span> DevDto <span className="code-m">getInfo</span>() &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-k">return</span> <span className="code-k">new</span> <span className="code-c">DevDto</span>(<span className="code-s">"iOS"</span>, <span className="code-s">"Backend"</span>);<br />
            &nbsp;&nbsp;&#125;<br />
            &#125;
          </code>
        </div>
      </div>
    </section>
  );
};

export default Hero;
