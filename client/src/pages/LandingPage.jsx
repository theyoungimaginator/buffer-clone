import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Sparkles, BarChart, CalendarDays, Rocket, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { ModeToggle } from '../components/mode-toggle';

const NavHeader = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm"
    >
      <nav className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">BufferX</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/features" className="text-sm font-medium transition-colors hover:text-primary">Features</Link>
          <Link to="/pricing" className="text-sm font-medium transition-colors hover:text-primary">Pricing</Link>
          <Link to="/testimonials" className="text-sm font-medium transition-colors hover:text-primary">Testimonials</Link>
          <ModeToggle />
          <Link to="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
};

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-24 text-center md:py-32">
      <div className="container relative z-10 mx-auto max-w-4xl px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 text-5xl font-extrabold leading-tight tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Effortless Social Media <span className="gradient-text">Scheduling</span> for Modern Creators
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-10 text-lg text-muted-foreground md:text-xl lg:text-2xl"
        >
          Plan, schedule, and publish your content across all social platforms with BufferX's smart AI and intuitive tools.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        >
          <Link to="/register">
            <Button size="lg" className="px-8 py-3 text-lg">
              Start Free Today <Rocket className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/features">
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
              Learn More
            </Button>
          </Link>
        </motion.div>
      </div>
      <div className="absolute left-0 top-0 -z-0 h-96 w-96 rounded-full bg-primary/10 blur-[100px] filter" />
      <div className="absolute bottom-0 right-0 -z-0 h-80 w-80 rounded-full bg-secondary/10 blur-[100px] filter" />
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <CalendarDays className="h-8 w-8 text-primary" />,
      title: "Smart Scheduling Calendar",
      description: "Visually plan and manage all your posts with a beautiful drag-and-drop calendar.",
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "AI Content Assistant",
      description: "Generate captions, hashtags, and rewrite content with built-in ChatGPT intelligence.",
    },
    {
      icon: <BarChart className="h-8 w-8 text-primary" />,
      title: "Actionable Analytics",
      description: "Track performance, engagement, and reach with clear, easy-to-understand reports.",
    },
    {
      icon: <Rocket className="h-8 w-8 text-primary" />,
      title: "Multi-Platform Support",
      description: "Connect and manage Instagram, Twitter, LinkedIn, Facebook, and more from one dashboard.",
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "Approval Workflows",
      description: "Collaborate seamlessly with teams; managers approve content before publishing.",
    },
    {
      icon: <img src="https://img.icons8.com/ios-filled/50/FFD700/link.png" alt="Link icon" className="h-8 w-8" />,
      title: "Link-in-Bio Builder",
      description: "Create customizable, trackable link-in-bio pages for Instagram.",
    },
  ];

  return (
    <section id="features" className="container py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center text-4xl font-bold md:text-5xl"
      >
        Powerful Features for <span className="gradient-text">Growth</span>
      </motion.h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card className="flex h-full flex-col items-center p-6 text-center shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="mb-4 rounded-full bg-primary/10 p-3">{feature.icon}</div>
              <CardTitle className="mb-2 text-xl">{feature.title}</CardTitle>
              <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "BufferX transformed how we manage our social media. The AI assistant is a game-changer!",
      author: "Sarah J.",
      title: "Marketing Manager, TechCorp",
    },
    {
      quote: "The visual calendar and approval workflows saved our team countless hours every week.",
      author: "Mark T.",
      title: "Agency Owner, CreativeFlow",
    },
    {
      quote: "Finally, an intuitive social media tool that actually helps me grow. Highly recommend!",
      author: "Emily R.",
      title: "Content Creator",
    },
  ];
  return (
    <section id="testimonials" className="bg-muted/30 py-20">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center text-4xl font-bold md:text-5xl"
        >
          What Our <span className="gradient-text">Users Say</span>
        </motion.h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <Card className="flex h-full flex-col p-6 shadow-md transition-all duration-300 hover:shadow-xl">
                <CardContent className="mb-4 flex-grow text-lg italic text-muted-foreground">
                  "{testimonial.quote}"
                </CardContent>
                <CardFooter className="flex flex-col items-start pt-4">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => {
  const pricingPlans = [
    {
      name: "Free Tier",
      price: "$0",
      description: "Perfect for getting started with social media scheduling.",
      features: [
        { text: "10 Scheduled Posts/Month", included: true },
        { text: "1 Platform Connected", included: true },
        { text: "Limited Analytics (7 days)", included: true },
        { text: "Basic Scheduling", included: true },
        { text: "AI Content Assistant (Groq)", included: true },
        { text: "Approval Workflows", included: false },
        { text: "Unlimited Posts", included: false },
        { text: "All AI Features (ChatGPT)", included: false },
      ],
      buttonText: "Get Started Free",
      link: "/register",
    },
    {
      name: "Pro Plan",
      price: "$19",
      period: "/month",
      description: "Unlock advanced features for growing your online presence.",
      features: [
        { text: "Unlimited Scheduled Posts", included: true },
        { text: "5 Platforms Connected", included: true },
        { text: "Full Analytics & Insights", included: true },
        { text: "Advanced Scheduling (Timezones)", included: true },
        { text: "AI Content Assistant (Groq + 100 ChatGPT credits)", included: true },
        { text: "Approval Workflows", included: false },
        { text: "Team Collaboration", included: false },
        { text: "Link-in-Bio Builder", included: false },
      ],
      buttonText: "Upgrade to Pro",
      link: "/register?plan=pro",
      highlight: true,
    },
    {
      name: "Agency Plan",
      price: "$49",
      period: "/month",
      description: "Comprehensive solution for teams and agencies.",
      features: [
        { text: "Unlimited Scheduled Posts", included: true },
        { text: "Unlimited Platforms", included: true },
        { text: "Full Analytics & Reports", included: true },
        { text: "Advanced Scheduling (Timezones)", included: true },
        { text: "AI Content Assistant (Groq + 500 ChatGPT credits)", included: true },
        { text: "Approval Workflows", included: true },
        { text: "Team Collaboration (5 users)", included: true },
        { text: "Link-in-Bio Builder", included: true },
      ],
      buttonText: "Contact Sales",
      link: "/contact",
    },
  ];

  return (
    <section id="pricing" className="container py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center text-4xl font-bold md:text-5xl"
      >
        Choose Your <span className="gradient-text">Perfect Plan</span>
      </motion.h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className={plan.highlight ? "scale-105 transform transition-transform duration-300" : ""}
          >
            <Card
              className={`flex h-full flex-col justify-between p-6 shadow-xl ${
                plan.highlight ? "border-2 border-primary" : ""
              }`}
            >
              <CardHeader className="items-center pb-4">
                <CardTitle className="mb-2 text-3xl font-bold">{plan.name}</CardTitle>
                <div className="text-5xl font-extrabold text-primary">
                  {plan.price}
                  {plan.period && <span className="text-xl text-muted-foreground">{plan.period}</span>}
                </div>
                <CardDescription className="mt-2 text-center text-muted-foreground">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mb-6 flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, featIndex) => (
                    <li key={featIndex} className="flex items-center text-sm">
                      {feature.included ? (
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="mr-2 h-5 w-5 text-red-500" />
                      )}
                      <span className={!feature.included ? "text-muted-foreground line-through" : ""}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-0">
                <Link to={plan.link} className="w-full">
                  <Button className="w-full" size="lg" variant={plan.highlight ? "default" : "outline"}>
                    {plan.buttonText}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="border-t bg-muted/20 py-12">
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="space-y-4">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold">BufferX</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Your all-in-one social media scheduling and growth platform.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Product</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/features" className="hover:text-primary">Features</Link></li>
            <li><Link to="/pricing" className="hover:text-primary">Pricing</Link></li>
            <li><Link to="/login" className="hover:text-primary">Login</Link></li>
            <li><Link to="/register" className="hover:text-primary">Sign Up</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link to="/careers" className="hover:text-primary">Careers</Link></li>
            <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Legal</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-primary">Terms of Service</Link></li>
            <li><Link to="/cookies" className="hover:text-primary">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} BufferX. All rights reserved.
      </div>
    </footer>
  );
};

const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <NavHeader />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;