
function ContactPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-4 animate-slide-in">
            <h1 className="text-4xl font-bold text-primary mb-4">Contact Me</h1>
            <p className="text-muted-foreground text-center mb-8 max-w-md">
                Have questions, feedback, or need help? Feel free to reach out to me, and i’ll get back to you as soon as possible!
            </p>
            <form className="w-full max-w-lg bg-card p-8 rounded-lg shadow-lg">
                <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        className="w-full px-4 py-2 bg-input text-foreground border border-border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        className="w-full px-4 py-2 bg-input text-foreground border border-border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                        Message
                    </label>
                    <textarea
                        id="message"
                        rows={5}
                        placeholder="Your message"
                        className="w-full px-4 py-2 bg-input text-foreground border border-border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                        required
                    />
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all"
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactPage;
