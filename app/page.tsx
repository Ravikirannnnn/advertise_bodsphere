"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useAnimation, useInView } from "framer-motion"
import { ArrowRight, CheckCircle, Instagram, Facebook, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Add this after the other imports at the top of the file
function StatsCounter({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView) {
      let startTime: number
      let animationFrame: number

      const duration = 2000 // 2 seconds

      const countUp = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        const currentCount = Math.floor(progress * end)

        setCount(currentCount)

        if (progress < 1) {
          animationFrame = requestAnimationFrame(countUp)
        }
      }

      animationFrame = requestAnimationFrame(countUp)

      return () => cancelAnimationFrame(animationFrame)
    }
  }, [inView, end])

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="text-4xl md:text-5xl font-bold mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-lg text-white/80">{label}</div>
    </div>
  )
}

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isYearly, setIsYearly] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle subscription logic here
    alert(`Thank you for subscribing with ${email}! Welcome to Bodsphere.`)
    setEmail("")
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const features = [
    { title: "Expert-Led Sessions", description: "Learn from certified yoga instructors with years of experience" },
    { title: "Personalized Journey", description: "Customized programs tailored to your fitness level and goals" },
    { title: "Community Support", description: "Join a global community of like-minded individuals" },
    { title: "Anytime, Anywhere", description: "Access your practice sessions from any device, anytime" },
  ]

  const pricingPlans = [
    {
      name: "Basic",
      description: "Perfect for beginners starting their yoga journey",
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      features: [
        "Access to 50+ beginner classes",
        "Basic pose guides",
        "Community forum access",
        "1 live session per month",
      ],
      popular: false,
    },
    {
      name: "Premium",
      description: "Our most popular plan for dedicated practitioners",
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      features: [
        "Access to 200+ classes for all levels",
        "Personalized practice recommendations",
        "Progress tracking",
        "4 live sessions per month",
        "Downloadable classes for offline practice",
      ],
      popular: true,
    },
    {
      name: "Ultimate",
      description: "The complete Bodsphere experience for serious yogis",
      monthlyPrice: 29.99,
      yearlyPrice: 299.99,
      features: [
        "Unlimited access to all classes",
        "1-on-1 sessions with instructors",
        "Custom program creation",
        "Unlimited live sessions",
        "Priority support",
        "Early access to new features",
      ],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-50 ">
      {/* Navbar */}
      <motion.button
  initial={{ y: 100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-red-500 to-rose-500 text-white px-6 py-4 rounded-full shadow-lg hover:scale-105 hover:shadow-[0_0_15px_rgba(244,114,182,0.6)] transition-all duration-300 text-lg font-semibold"
>
  Join Now
</motion.button>


      <header
        className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center mx-15">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mr-2"
            >
            <div className="w-30 h-30  flex items-center justify-center">
  <Image
    src="/logo.png" // Path to your logo image
    alt="Logo"
    width={150} // Adjust size as necessary
    height={50} // Adjust size as necessary
    className="object-cover"
  />
</div>

            </motion.div>
            {/* <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold bg-gradient-to-r from-primary to-rose-500 bg-clip-text text-transparent"
            >
              Bodsphere
            </motion.h1> */}
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-primary hover:bg-primary/90">Sign Up Free</Button>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden px-0 md:px-10">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 right-0 w-72 h-72 bg-primary/30 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-rose-300 rounded-full filter blur-3xl opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center ">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="md:w-1/2 mb-12 md:mb-0"
            >
              <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Welcome to{" "} <br />
                <span className="bg-gradient-to-r from-primary to-rose-500 bg-clip-text text-transparent">
                  the Yogic World
                </span>{" "}
                {/* With Yoga */}
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-gray-700 mb-8 max-w-lg">
                Join Bodsphere and discover a new way to practice yoga. Our platform offers personalized sessions,
                expert guidance, and a supportive community.
              </motion.p>
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-lg text-lg">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 px-8 py-6 rounded-lg text-lg"
                >
                  Watch Demo
                </Button>
              </motion.div>
              <motion.div variants={fadeIn} className="mt-8 flex items-center">
                <div className="flex -space-x-2">
                  {/* {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                      <Image
                        src={`./`}
                        alt={`User ${i}`}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                  ))} */}
<div className="w-20 h-20 rounded-full border-2 border-white overflow-hidden relative">
  <Image
    src="/DSC00065.jpg"
    alt="User"
    fill
    className="object-cover"
  />
</div>

                </div>
                <div className="ml-4">
                  <div className="font-medium">Join 10,000+ members</div>
                  <div className="text-sm text-gray-500">Transforming lives daily</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:w-1/2 relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-gradient-to-br from-white/60 to-white/20 backdrop-blur-sm">
                <div className="absolute inset-0  from-primary/10 to-rose-500/10"></div>
                <Image
                      src="/AW5A6009 copy lowRes.jpg" // 👈 Your single image
                  alt="Yoga Pose"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src="/DSC00065.jpg" // 👈 Your single image
                        alt="Instructor"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">Start Yogic Journey with Bodsphere</h3>
                      <p className="text-sm text-gray-600">Live Sessoins available • Join now</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -right-4 top-1/4 bg-white rounded-lg shadow-xl p-3 border border-gray-100"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Progress Tracking</p>
                    <p className="text-xs text-gray-500">Track your journey</p>
                  </div>
                </div>
              </motion.div> */}
{/* 
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -left-4 bottom-1/4 bg-white rounded-lg shadow-xl p-3 border border-gray-100"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Personalized Plans</p>
                    <p className="text-xs text-gray-500">Tailored for you</p>
                  </div>
                </div>
              </motion.div> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-primary to-rose-500 bg-clip-text text-transparent">Bodsphere</span>
            </motion.h2>
            <motion.p variants={fadeIn} className="text-gray-600 max-w-2xl mx-auto">
              Our platform is designed to make yoga accessible, enjoyable, and effective for everyone, regardless of
              your experience level.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-xl shadow-sm border border-rose-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-rose-500 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar Section */}
      <section className="bg-gradient-to-r from-primary to-rose-500 text-white">
  <div className="container mx-auto px-0">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white/10 backdrop-blur-sm rounded-xl  p-8 shadow-lg border border-white/20"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <StatsCounter end={12000} label="Users Subscribed" suffix="+" />
        <StatsCounter end={190} label="Global Presence" suffix="+" />
        <StatsCounter end={500} label="Instructors Worldwide" suffix="+" />
      </div>
    </motion.div>
  </div>
</section>



      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">
              Transforming Lives{" "}
              <span className="bg-gradient-to-r from-primary to-rose-500 bg-clip-text text-transparent">Every Day</span>
            </motion.h2>
            <motion.p variants={fadeIn} className="text-gray-600 max-w-2xl mx-auto">
              Hear from our community members who have experienced the Bodsphere difference.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Emma Thompson",
                role: "Yoga Enthusiast",
                quote:
                  "Bodsphere transformed my practice. The personalized sessions and expert guidance have helped me progress faster than I ever thought possible.",
              },
              {
                name: "Michael Chen",
                role: "Beginner Yogi",
                quote:
                  "As someone new to yoga, I was intimidated at first. Bodsphere made it approachable and enjoyable. Now I practice daily!",
              },
              {
                name: "Sarah Johnson",
                role: "Fitness Instructor",
                quote:
                  "The quality of instruction on Bodsphere is unmatched. I recommend it to all my clients as a complement to their fitness routines.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={`/placeholder.svg?height=48&width=48&text=${testimonial.name.charAt(0)}`}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                <div className="mt-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-rose-500 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Begin Your Yoga Journey Today</h2>
            <p className="text-lg mb-8 text-white/90">
              Join thousands of members who are already experiencing the benefits of Bodsphere. Subscribe now and get
              access to unlimited classes, personalized programs, and our supportive community.
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/70 focus:border-white"
                />
                <Button type="submit" className="bg-white text-primary hover:bg-white/90">
                  Subscribe Now
                </Button>
              </div>
            </form>

            <p className="text-sm text-white/80">
              Start your 7-day free trial. Cancel anytime. No credit card required.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        {/* <div className="container mx-auto px-4"> */}
          {/* <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <h2 className="text-2xl font-bold">Bodsphere</h2>
              </div>
              <p className="text-gray-400 mb-4">Transform your body and mind with our expert-led yoga sessions.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {["Home", "About Us", "Classes", "Instructors", "Pricing"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                {["FAQ", "Contact Us", "Privacy Policy", "Terms of Service", "Help Center"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for tips, new classes, and exclusive offers.
              </p>
              <form className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary"
                />
                <Button type="submit" className="ml-2 bg-primary hover:bg-primary/90">
                  Subscribe
                </Button>
              </form>
            </div>
          </div> */}

          <div className="  text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Bodsphere. All rights reserved.</p>
          </div>
        {/* </div> */}
      </footer>
    </div>
  )
}
