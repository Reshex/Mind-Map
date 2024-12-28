import { Linkedin, Mail, Globe, Github } from "lucide-react";

function ContactPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-4 animate-slide-in">
            <h1 className="text-4xl font-bold text-primary mb-4">Contact Me</h1>
            <p className="text-muted-foreground text-center mb-8 max-w-md">
                Feel free to reach out to me through any of the platforms below. I look forward to connecting!
            </p>
            <div className="w-full max-w-lg bg-card p-8 rounded-lg shadow-lg space-y-6">
                <ContactItem
                    icon={<Linkedin className="text-primary w-6 h-6" />}
                    title="LinkedIn"
                    description="Connect with me on LinkedIn."
                    link="https://www.linkedin.com/in/barabulher/"
                />
                <ContactItem
                    icon={<Github className="text-primary w-6 h-6" />}
                    title="GitHub"
                    description="Check out my projects on GitHub."
                    link="https://github.com/Reshex"
                />
                <ContactItem
                    icon={<Globe className="text-primary w-6 h-6" />}
                    title="Portfolio"
                    description="Visit my portfolio website."
                    link="https://reshex.github.io/My-Portfolio/"
                />
                <ContactItem
                    icon={<Mail className="text-primary w-6 h-6" />}
                    title="Email"
                    description="Drop me an email."
                    link="mailto:bar7569@gmail.com"
                />
            </div>
        </div>
    );
}

function ContactItem({ icon, title, description, link }: { icon: React.ReactNode; title: string; description: string; link: string }) {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-4 p-4 bg-muted hover:bg-muted-foreground rounded-lg transition"
        >
            <div>{icon}</div>
            <div>
                <h2 className="text-lg text-primary font-bold">{title}</h2>
                <p className="text-sm text-foreground">{description}</p>
            </div>
        </a>
    );
}

export default ContactPage;
