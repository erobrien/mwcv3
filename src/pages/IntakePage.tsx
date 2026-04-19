import { useEffect } from "react";
import "../intake/styles.css";
import StyleShowcase from "../intake/StyleShowcase";

const IntakePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <StyleShowcase />;
};

export default IntakePage;
