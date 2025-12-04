import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Book, Rocket, Code, HelpCircle, Zap, Lock } from 'lucide-react';
import './DocsPage.css';

function DocsPage() {
  return (
    <div className="docs-page">
      <Navbar />

      <div className="docs-container">
        <aside className="docs-sidebar">
          <h3>Documentation</h3>
          <nav className="docs-nav">
            <a href="#getting-started" className="docs-nav-link active">
              <Rocket size={18} />
              Getting Started
            </a>
            <a href="#features" className="docs-nav-link">
              <Zap size={18} />
              Features
            </a>
            <a href="#authentication" className="docs-nav-link">
              <Lock size={18} />
              Authentication
            </a>
            <a href="#api" className="docs-nav-link">
              <Code size={18} />
              API Reference
            </a>
            <a href="#faq" className="docs-nav-link">
              <HelpCircle size={18} />
              FAQ
            </a>
          </nav>
        </aside>

        <main className="docs-content">
          <section id="getting-started" className="docs-section">
            <h1>Getting Started with Grass</h1>
            <p className="lead">
              Welcome to Grass! This guide will help you get started with building
              better habits through our gamified task management platform.
            </p>

            <h2>Quick Start</h2>
            <div className="docs-steps">
              <div className="docs-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Install a Solana Wallet</h3>
                  <p>
                    Download and install a Solana wallet extension like{' '}
                    <a href="https://phantom.app" target="_blank" rel="noopener noreferrer">
                      Phantom
                    </a>{' '}
                    or{' '}
                    <a href="https://solflare.com" target="_blank" rel="noopener noreferrer">
                      Solflare
                    </a>
                    .
                  </p>
                </div>
              </div>

              <div className="docs-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Connect Your Wallet</h3>
                  <p>
                    Click "Launch App" and connect your Solana wallet. Sign the
                    message to authenticate securely.
                  </p>
                </div>
              </div>

              <div className="docs-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Start Adding Tasks</h3>
                  <p>
                    Create your first task, complete it, and start earning XP.
                    Watch your level grow as you build better habits!
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="docs-section">
            <h2>Features Overview</h2>

            <h3>XP & Leveling System</h3>
            <p>
              Every task you complete earns you experience points (XP). The amount
              of XP depends on the task's priority:
            </p>
            <ul>
              <li><strong>Low Priority:</strong> +10 XP</li>
              <li><strong>Medium Priority:</strong> +15 XP</li>
              <li><strong>High Priority:</strong> +25 XP</li>
            </ul>
            <p>
              Your level is calculated based on your total XP. The formula is:{' '}
              <code>Level = √(XP / 100) + 1</code>
            </p>

            <h3>Streak System</h3>
            <p>
              Maintain your momentum by completing tasks daily. Each day you're
              active increases your streak counter. Streaks provide bonus XP:
            </p>
            <ul>
              <li>Bonus XP = Streak × 0.5 per completed task</li>
              <li>Streaks reset if you miss a day</li>
            </ul>

            <h3>Task Categories</h3>
            <p>Organize your tasks by category:</p>
            <ul>
              <li>🌿 Health</li>
              <li>💪 Exercise</li>
              <li>📚 Learning</li>
              <li>💼 Work</li>
              <li>👥 Social</li>
              <li>🎨 Creative</li>
              <li>✨ Other</li>
            </ul>

            <h3>AI Assistant</h3>
            <p>
              Our AI helper can suggest healthy tasks and provide motivational tips
              to keep you on track. Click the "AI Helper" button to:
            </p>
            <ul>
              <li>Get personalized task suggestions</li>
              <li>Receive motivational messages</li>
              <li>Find inspiration when you're stuck</li>
            </ul>
          </section>

          <section id="authentication" className="docs-section">
            <h2>Authentication</h2>

            <h3>Web3 Wallet Authentication</h3>
            <p>
              Grass uses Solana wallet authentication for a secure, passwordless
              experience. Here's how it works:
            </p>
            <ol>
              <li>You connect your Solana wallet (Phantom, Solflare, etc.)</li>
              <li>We generate a unique message for you to sign</li>
              <li>You sign the message with your wallet</li>
              <li>We verify the signature and authenticate you</li>
            </ol>

            <h3>Security</h3>
            <p>
              Your wallet signature proves ownership without exposing your private
              keys. We never ask for your seed phrase or private keys.
            </p>
          </section>

          <section id="api" className="docs-section">
            <h2>API Reference</h2>

            <h3>Base URL</h3>
            <div className="code-block">
              <code>https://your-backend-url.railway.app/api</code>
            </div>

            <h3>Authentication Endpoints</h3>
            <div className="api-endpoint">
              <div className="endpoint-header">
                <span className="method get">GET</span>
                <span className="path">/auth/nonce/:walletAddress</span>
              </div>
              <p>Get a nonce for wallet signature</p>
            </div>

            <div className="api-endpoint">
              <div className="endpoint-header">
                <span className="method post">POST</span>
                <span className="path">/auth/verify</span>
              </div>
              <p>Verify wallet signature and authenticate</p>
              <div className="code-block">
                <pre>{`{
  "walletAddress": "string",
  "signature": "string",
  "message": "string"
}`}</pre>
              </div>
            </div>

            <h3>Task Endpoints</h3>
            <div className="api-endpoint">
              <div className="endpoint-header">
                <span className="method get">GET</span>
                <span className="path">/tasks</span>
              </div>
              <p>Get all tasks for authenticated user</p>
            </div>

            <div className="api-endpoint">
              <div className="endpoint-header">
                <span className="method post">POST</span>
                <span className="path">/tasks</span>
              </div>
              <p>Create a new task</p>
            </div>

            <div className="api-endpoint">
              <div className="endpoint-header">
                <span className="method post">POST</span>
                <span className="path">/tasks/:taskId/complete</span>
              </div>
              <p>Complete a task and earn XP</p>
            </div>
          </section>

          <section id="faq" className="docs-section">
            <h2>Frequently Asked Questions</h2>

            <div className="faq-item">
              <h3>What is Grass?</h3>
              <p>
                Grass is a gamified self-improvement platform that helps you build
                better habits through task management, XP systems, and streak
                tracking.
              </p>
            </div>

            <div className="faq-item">
              <h3>Do I need cryptocurrency to use Grass?</h3>
              <p>
                No! While we use Solana wallet authentication, you don't need any
                cryptocurrency. The wallet is only used for secure login.
              </p>
            </div>

            <div className="faq-item">
              <h3>Is Grass free?</h3>
              <p>
                Yes! Grass is completely free to use. We believe everyone should
                have access to tools that help them build better habits.
              </p>
            </div>

            <div className="faq-item">
              <h3>How is my data stored?</h3>
              <p>
                Your data is securely stored in our database and associated with
                your wallet address. We never share your data with third parties.
              </p>
            </div>

            <div className="faq-item">
              <h3>Can I reset my progress?</h3>
              <p>
                Currently, progress cannot be reset. However, you can always start
                fresh by connecting with a different wallet address.
              </p>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default DocsPage;


