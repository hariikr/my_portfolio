import { useEffect, useState } from 'react'
import axios from 'axios'

const Section = ({ id, title, children, subtitle }) => (
  <section id={id} className="py-16 sm:py-24">
    <div className="container-pro">
      <header className="mb-6">
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="mt-2 text-gray-600 dark:text-gray-300">{subtitle}</p>}
      </header>
      <div className="prose dark:prose-invert max-w-none">{children}</div>
    </div>
  </section>
)

function useDarkMode() {
  const [enabled, setEnabled] = useState(() => {
    return localStorage.getItem('theme') === 'dark' ||
      (localStorage.getItem('theme') === null && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })
  useEffect(() => {
    const root = document.documentElement
    if (enabled) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [enabled])
  return [enabled, setEnabled]
}

export default function App() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({ loading: false, ok: null, msg: '' })
  const [dark, setDark] = useDarkMode()

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, ok: null, msg: '' })
    try {
      await axios.post('/api/contact', form)
      setStatus({ loading: false, ok: true, msg: 'Message sent successfully!' })
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus({ loading: false, ok: false, msg: err?.response?.data?.error || 'Failed to send message' })
    }
  }

  const skills = {
    Frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'Tailwind CSS'],
    Backend: ['Node.js', 'Express.js', 'Django', 'Python', 'Java'],
    Databases: ['MongoDB', 'MySQL', 'PostgreSQL'],
    DevOps: ['Docker', 'GitHub Actions', 'AWS EC2', 'Cron Jobs'],
    Tools: ['Git', 'VSCode', 'Postman', 'Figma'],
    APIs: ['OpenAI API', 'REST APIs']
  }

  const projects = [
    {
      title: 'Persona — AI‑Powered Autobiography Writer',
      tech: 'React, OpenAI API',
      desc: 'Turns user inputs into well‑structured autobiographies using AI.',
      live: '',
      code: '',
    },
    {
      title: 'BlockFund — Web3 Crowdfunding Platform',
      tech: 'React, Solidity, Thirdweb, Tailwind',
      desc: 'Decentralized, Kickstarter‑style fundraising on the blockchain.',
      live: '',
      code: '',
    },
    {
      title: 'FoodEase — Hotel Food Delivery App',
      tech: 'MERN Stack',
      desc: 'End‑to‑end ordering with auth, admin, and real‑time status.',
      live: '',
      code: '',
    },
    {
      title: 'Payment Collection App',
      tech: 'React Native, Node.js, Express, PostgreSQL, AWS EC2',
      desc: 'Full‑stack finance app with JWT auth and CI/CD.',
      live: '',
      code: '',
    },
    {
      title: 'Netflix Clone (React)',
      tech: 'React, TMDB API',
      desc: 'Dynamic movie catalogue emulating the Netflix UI.',
      live: '',
      code: '',
    },
    {
      title: 'SOE Project Hub',
      tech: 'HTML, CSS, JS',
      desc: 'Mini‑project submission portal for CUSAT students.',
      live: '',
      code: '',
    },
    {
      title: 'Hospital Management System',
      tech: 'Django',
      desc: 'Role‑based patient, doctor, and appointment management.',
      live: 'https://harikris123.pythonanywhere.com',
      code: '',
    },
  ]

  return (
    <div>
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-950/70 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="container-pro flex items-center justify-between py-4">
          <a href="#" className="text-xl font-bold">Harikrishnan Aneesh</a>
          <nav className="hidden sm:flex gap-6 text-sm">
            <a href="#about" className="hover:text-brand-600">About</a>
            <a href="#projects" className="hover:text-brand-600">Projects</a>
            <a href="#skills" className="hover:text-brand-600">Skills</a>
            <a href="#resume" className="hover:text-brand-600">Resume</a>
            <a href="#contact" className="hover:text-brand-600">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <button aria-label="Toggle dark mode" onClick={() => setDark(!dark)} className="rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm">
              {dark ? 'Light' : 'Dark'}
            </button>
            <a href="#contact" className="btn-primary text-sm">Hire Me</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container-pro py-20 sm:py-28">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
                Hi, I’m Harikrishnan Aneesh.
              </h1>
              <p className="mt-2 text-brand-600 font-semibold">Full‑Stack Developer • DevOps Enthusiast</p>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                I design, build, and ship modern web applications. B.Tech CSE (CUSAT). Currently Full‑Stack Developer Intern at Coligo.
              </p>
              <div className="mt-8 flex gap-4">
                <a href="#projects" className="btn-primary">View Projects</a>
                <a href="/Resume-HarikrishnanAneesh.pdf" download className="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 px-5 py-2.5">Download Resume</a>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                <a href="mailto:harikrishnananish0@gmail.com" className="hover:text-brand-600">harikrishnananish0@gmail.com</a>
                <span className="hidden sm:inline">•</span>
                <a href="https://www.instagram.com/hari.kris.hnan/" target="_blank" rel="noreferrer" className="hover:text-brand-600">Instagram</a>
                <a href="https://leetcode.com/u/Harikri12/" target="_blank" rel="noreferrer" className="hover:text-brand-600">LeetCode</a>
                <a href="https://github.com/hariikr" target="_blank" rel="noreferrer" className="hover:text-brand-600">GitHub</a>
                <a href="https://www.linkedin.com/in/harikrishnan-aneesh-823087216/" target="_blank" rel="noreferrer" className="hover:text-brand-600">LinkedIn</a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-tr from-brand-200 to-brand-500 opacity-20 absolute inset-0 blur-2xl" />
              <div className="card relative p-6">
                <ul className="grid grid-cols-2 gap-4 text-sm">
                  <li className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">React</li>
                  <li className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">Node.js</li>
                  <li className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">Express</li>
                  <li className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">Tailwind</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section id="about" title="About Me" subtitle="A quick intro">
        <p>
          I build reliable, scalable software with a focus on clean code and thoughtful UX. My toolkit spans React and Tailwind on the frontend, Node/Express and Django on the backend, with CI/CD and DevOps practices to ship confidently.I’m constantly expanding my skills, exploring modern frameworks, cloud technologies, and automation tools to deliver impactful, production-ready solutions.
        </p>
      </Section>

      <Section id="projects" title="Projects" subtitle="Selected work">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <article key={p.title} className="card p-5">
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="mt-1 text-xs text-gray-500">{p.tech}</p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{p.desc}</p>
              <div className="mt-4 flex gap-3">
                {p.live ? (
                  <a href={p.live} target="_blank" rel="noreferrer" className="text-brand-600 hover:underline">Live</a>
                ) : (
                  <span className="text-gray-400">Live N/A</span>
                )}
                {p.code ? (
                  <a href={p.code} target="_blank" rel="noreferrer" className="text-brand-600 hover:underline">Code</a>
                ) : (
                  <span className="text-gray-400">Code N/A</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="skills" title="Skills" subtitle="Core competencies">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 not-prose">
          {Object.entries(skills).map(([group, list]) => (
            <div key={group} className="card p-5">
              <h3 className="font-semibold mb-3">{group}</h3>
              <div className="flex flex-wrap gap-2">
                {list.map((item) => (
                  <span key={item} className="inline-flex items-center rounded-lg border border-gray-200 dark:border-gray-800 px-2.5 py-1 text-xs">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="resume" title="Experience & Resume">
        <div className="card p-5 space-y-6">
          <ul className="space-y-4">
            <li>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Full‑Stack Developer Intern — Coligo</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">2025 — Present</p>
                </div>
                <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded">Angular · Node.js · MySQL</span>
              </div>
              <ul className="list-disc ml-5 mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">

                <li>Actively learning full-stack and DevOps practices while supporting real-world production workflows.</li>
              </ul>
            </li>
            <li>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">IBM SkillsBuild Intern — AI/ML</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">WaterSmart Chatbot</p>
                </div>
                <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded">IBM Watson</span>
              </div>
              <ul className="list-disc ml-5 mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>Built a chatbot to promote water conservation awareness.</li>
              </ul>
            </li>
          </ul>
          <a href="/Resume-HarikrishnanAneesh.pdf" download className="btn-primary inline-flex">Download PDF</a>
        </div>
      </Section>

      <Section id="contact" title="Contact Me" subtitle="Let’s build something great together">
        <form onSubmit={onSubmit} className="card p-6 max-w-xl">
          <input type="text" name="company" className="hidden" tabIndex="-1" autoComplete="off" onChange={()=>{}} />
          {/* honeypot field for spam bots */}
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            </div>
            <button type="submit" className="btn-primary" disabled={status.loading}>
              {status.loading ? 'Sending…' : 'Send Message'}
            </button>
            {status.msg && (
              <p className={`${status.ok ? 'text-green-600' : 'text-red-600'} text-sm`}>{status.msg}</p>
            )}
          </div>
        </form>
      </Section>

      <footer className="py-10 border-t border-gray-200 dark:border-gray-800">
        <div className="container-pro text-sm text-gray-600 dark:text-gray-400 flex items-center justify-between">
          <p>© {new Date().getFullYear()} Harikrishnan Aneesh. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/hari.kris.hnan/" target="_blank" className="hover:text-brand-600" rel="noreferrer">Instagram</a>
            <a href="https://leetcode.com/u/Harikri12/" target="_blank" className="hover:text-brand-600" rel="noreferrer">LeetCode</a>
            <a href="https://www.linkedin.com/in/harikrishnan-aneesh-823087216/" target="_blank" className="hover:text-brand-600" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/hariikr" target="_blank" className="hover:text-brand-600" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
