
import { Copyright, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container flex h-16 items-center justify-between">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Copyright className="h-4 w-4" />
          <span>{new Date().getFullYear()} Lovable. All rights reserved.</span>
        </p>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
