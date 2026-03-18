import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero container" id="home">
      <div className="hero-content">
        <div className="badge">iOS-to-Backend Transition</div>
        <h1>
          클라이언트의 마음을 읽어내는 <br />
          <span className="accent">백엔드 개발자</span>, OOO입니다.
        </h1>
        <p>
          3년간의 iOS 개발 경험은 더 견고하고 효율적인 API 스펙을 설계하는 저만의 무기입니다. <br />
          데이터의 흐름을 설계하고 시스템 아키텍처를 최적화하는 데 열정을 가지고 있습니다.
        </p>
        <div className="hero-btns">
          <a href="#portfolio" className="btn-primary">View Portfolio</a>
          <a href="#about" className="btn-secondary">About Me</a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="visual-circle"></div>
        <div className="visual-card glass-panel">
          <code>
            <span className="code-blue">@RestController</span><br />
            <span className="code-purple">public class</span> <span className="code-yellow">PortfolioController</span> &#123;<br />
            &nbsp;&nbsp;<span className="code-blue">@GetMapping</span>(<span className="code-green">"/api/v1/dev-info"</span>)<br />
            &nbsp;&nbsp;<span className="code-purple">public</span> DevDto <span className="code-yellow">getInfo</span>() &#123;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-purple">return</span> <span className="code-purple">new</span> <span className="code-yellow">DevDto</span>(<span className="code-green">"iOS Understanding", "Backend Power"</span>);<br />
            &nbsp;&nbsp;&#125;<br />
            &#125;
          </code>
        </div>
      </div>
    </section>
  );
};

export default Hero;
