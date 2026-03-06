import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Reorder } from 'motion/react';
import { 
  Search, Moon, Rocket, Users, Activity, BookOpen, 
  LineChart, Code, Settings, Plus, Monitor, Brain, 
  ClipboardList, Landmark, Palette, Wrench, Bug, Eye, FileText,
  SlidersHorizontal, Zap, Wifi, Clock, Folder, Battery, Signal,
  ChevronLeft, Play, Square, Terminal, Cpu, Network, ShieldCheck
} from 'lucide-react';

// Agents App State

const workflowsData = [
  {
    id: 'wf-1', name: 'Feature Deployment', status: 'Running', progress: 65, color: 'blue',
    steps: [
      { id: 's1', name: 'Spec Analysis', agent: 'Maya Chen', status: 'Completed', x: 200, y: 200 },
      { id: 's2', name: 'Architecture Design', agent: 'Alex Rivera', status: 'Completed', x: 600, y: 200 },
      { id: 's3', name: 'UI Implementation', agent: 'Jordan Kim', status: 'Running', x: 1000, y: 200 },
      { id: 's4', name: 'API Integration', agent: 'Sam Taylor', status: 'Pending', x: 1400, y: 200 },
      { id: 's5', name: 'Deployment', agent: 'Casey Morgan', status: 'Pending', x: 1800, y: 200 }
    ]
  },
  {
    id: 'wf-2', name: 'Marketing Campaign', status: 'Active', progress: 40, color: 'red',
    steps: [
      { id: 's1', name: 'Market Research', agent: 'Reese Jones', status: 'Completed', x: 200, y: 600 },
      { id: 's2', name: 'Growth Hacking', agent: 'Riley Fox', status: 'Running', x: 600, y: 600 },
      { id: 's3', name: 'SEO Strategy', agent: 'Morgan Lee', status: 'Pending', x: 1000, y: 600 }
    ]
  },
  {
    id: 'wf-3', name: 'Data Synthesis', status: 'Idle', progress: 0, color: 'pink',
    steps: [
      { id: 's1', name: 'Research Gathering', agent: 'Blake Wilson', status: 'Pending', x: 200, y: 1000 },
      { id: 's2', name: 'Fact Checking', agent: 'Frankie Blue', status: 'Pending', x: 600, y: 1000 }
    ]
  }
];

const activityLogs = [
  { id: 1, time: '10:42:01', agent: 'Maya Chen', action: 'Generated feature specs', status: 'Success', icon: ClipboardList },
  { id: 2, time: '11:20:01', agent: 'Jordan Kim', action: 'Updated UI components', status: 'Success', icon: Palette },
  { id: 3, time: '14:01:05', agent: 'Sam Taylor', action: 'API connection failed', status: 'Error', icon: Wrench },
  { id: 4, time: '15:30:12', agent: 'Riley Fox', action: 'Launched viral campaign', status: 'Active', icon: Zap },
  { id: 5, time: '16:42:00', agent: 'Taylor Singh', action: 'Found bug in auth flow', status: 'Warning', icon: Bug },
  { id: 6, time: '17:15:00', agent: 'Casey Morgan', action: 'Optimized server nodes', status: 'Success', icon: Rocket },
  { id: 7, time: '18:05:00', agent: 'Alex Rivera', action: 'Refined system architecture', status: 'Success', icon: Landmark },
];

const apps = [
  { id: 'agents', name: 'Mission Control', icon: Rocket, color: 'bg-blue-600' },
  { id: 'workflows', name: 'Workflows', icon: SlidersHorizontal, color: 'bg-purple-600' },
  { id: 'activity', name: 'Activity', icon: Zap, color: 'bg-yellow-500' },
  { id: 'xteam', name: 'X Team', icon: Users, color: 'bg-red-500' },
  { id: 'knowledge', name: 'Knowledge', icon: BookOpen, color: 'bg-green-600' },
  { id: 'analytics', name: 'Analytics', icon: LineChart, color: 'bg-indigo-500' },
  { id: 'code', name: 'Code', icon: Code, color: 'bg-slate-700' },
  { id: 'settings', name: 'Settings', icon: Settings, color: 'bg-neutral-600' },
];

type ScreenState = 'boot' | 'lock' | 'home' | 'app';

const Stars = React.memo(() => {
  const stars = React.useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      id: i,
      width: Math.random() * 2 + 1 + 'px',
      height: Math.random() * 2 + 1 + 'px',
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      baseOpacity: Math.random() * 0.7 + 0.3,
      duration: Math.random() * 3 + 2
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            width: star.width,
            height: star.height,
            left: star.left,
            top: star.top,
            opacity: star.baseOpacity,
          }}
          animate={{
            opacity: [star.baseOpacity * 0.5, star.baseOpacity, star.baseOpacity * 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
});

const GlassWall = ({ x1, y1, x2, y2, color }: { x1: number, y1: number, x2: number, y2: number, color: string }) => {
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
  
  return (
    <div 
      className="absolute h-40 origin-left pointer-events-none"
      style={{ 
        left: x1, 
        top: y1, 
        width: length, 
        transform: `rotateZ(${angle}deg) rotateX(-90deg)`,
        transformStyle: 'preserve-3d',
        transformOrigin: 'bottom'
      }}
    >
      <div className={`w-full h-full bg-${color}-500/10 border-x-2 border-t-2 border-${color}-400/30 backdrop-blur-sm relative overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-t from-${color}-500/20 to-transparent`}></div>
        <div className={`absolute top-0 left-0 w-full h-1 bg-${color}-400/50 shadow-[0_0_15px_${color}]`}></div>
        {/* Decorative grid on glass */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
      </div>
    </div>
  );
};

const StructuralColumn = ({ x, y }: { x: number, y: number }) => (
  <div className="absolute w-12 h-12 -ml-6 -mt-6" style={{ left: x, top: y, transformStyle: 'preserve-3d' }}>
    <div className="absolute inset-0 bg-slate-800 border-2 border-slate-700 shadow-2xl" style={{ height: 400, transform: 'rotateX(-90deg)', transformOrigin: 'bottom' }}>
      <div className="w-full h-full bg-gradient-to-b from-slate-700 to-slate-900 relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
      </div>
    </div>
  </div>
);

const Workstation = ({ agent, x, y, color }: { agent: any, x: number, y: number, color: string }) => {
  const platformClasses = {
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-400/40', shadow: 'shadow-[0_0_40px_rgba(59,130,246,0.4)]', accent: 'blue-400' },
    red: { bg: 'bg-red-500/10', border: 'border-red-400/40', shadow: 'shadow-[0_0_40px_rgba(248,113,113,0.4)]', accent: 'red-400' },
    pink: { bg: 'bg-pink-500/10', border: 'border-pink-400/40', shadow: 'shadow-[0_0_40px_rgba(244,114,182,0.4)]', accent: 'pink-400' }
  }[color as 'blue'|'red'|'pink'];

  return (
    <div className="absolute w-48 h-48 -ml-24 -mt-24" style={{ left: x, top: y, transformStyle: 'preserve-3d' }}>
      {/* Desk Base */}
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-24 bg-slate-900/80 border-2 ${platformClasses.border} rounded-xl shadow-2xl`} style={{ transform: 'translateZ(10px)' }}>
        <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent`}></div>
        {/* Desk Surface Details */}
        <div className={`absolute top-2 left-2 right-2 h-1 bg-${platformClasses.accent}/20 rounded-full`}></div>
      </div>

      {/* High-Tech Chair */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-slate-800 border border-slate-700 rounded-lg shadow-xl" style={{ transform: 'translateZ(20px)' }}>
        <div className="absolute -top-12 left-0 w-full h-12 bg-slate-800 border-x border-t border-slate-700 rounded-t-lg" style={{ transform: 'rotateX(-10deg)', transformOrigin: 'bottom' }}></div>
      </div>

      {/* Floating Screens */}
      <motion.div 
        animate={{ y: [0, -5, 0], rotateY: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute -top-20 left-4 w-20 h-14 bg-blue-500/10 border border-blue-400/30 backdrop-blur-sm rounded shadow-[0_0_15px_rgba(59,130,246,0.2)] flex items-center justify-center overflow-hidden"
        style={{ transform: 'rotateY(-20deg) translateZ(100px)' }}
      >
        <div className="w-full h-full p-1 flex flex-col gap-1">
          <div className="w-full h-1 bg-blue-400/40 rounded-full"></div>
          <div className="w-2/3 h-1 bg-blue-400/20 rounded-full"></div>
          <div className="w-full h-4 bg-blue-400/5 rounded mt-auto"></div>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, -8, 0], rotateY: [5, -5, 5] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="absolute -top-24 right-4 w-24 h-16 bg-purple-500/10 border border-purple-400/30 backdrop-blur-sm rounded shadow-[0_0_15px_rgba(168,85,247,0.2)] flex items-center justify-center overflow-hidden"
        style={{ transform: 'rotateY(20deg) translateZ(120px)' }}
      >
        <div className="w-full h-full p-1 flex flex-col gap-1">
          <div className="flex justify-between">
            <div className="w-4 h-4 rounded-full border border-purple-400/40"></div>
            <div className="w-10 h-1 bg-purple-400/40 rounded-full"></div>
          </div>
          <div className="w-full h-6 bg-purple-400/5 rounded mt-auto"></div>
        </div>
      </motion.div>
    </div>
  );
};

const MaintenanceBot = React.memo(({ startX, startY, path, delay }: { startX: number, startY: number, path: {x: number, y: number}[], delay: number }) => {
  const xKeyframes = React.useMemo(() => path.map(p => p.x * 100), [path]);
  const yKeyframes = React.useMemo(() => path.map(p => p.y * 100), [path]);

  return (
    <motion.div 
      className="absolute w-10 h-10 -ml-5 -mt-5"
      style={{ transformStyle: 'preserve-3d', left: startX * 100, top: startY * 100 }}
      animate={{ left: xKeyframes, top: yKeyframes }}
      transition={{ repeat: Infinity, duration: 25, ease: "linear", delay }}
    >
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{ transform: 'rotateZ(45deg) rotateX(-60deg)', transformOrigin: 'bottom center' }}
      >
        <div className="w-8 h-8 bg-slate-800 rounded-lg border-2 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.6)] flex items-center justify-center relative overflow-hidden">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-400/30"></div>
          <motion.div 
            className="absolute inset-0 border border-blue-400/30"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
        <div className="w-8 h-2 bg-blue-500/20 rounded-full blur-sm mt-1 animate-pulse" style={{ transform: 'rotateX(60deg)' }}></div>
      </div>
    </motion.div>
  )
});

const botPaths = {
  bot1: [{x: 2, y: 2}, {x: 22, y: 2}, {x: 22, y: 22}, {x: 2, y: 22}, {x: 2, y: 2}],
  bot2: [{x: 22, y: 12}, {x: 2, y: 12}, {x: 2, y: 16}, {x: 22, y: 16}, {x: 22, y: 12}],
  bot3: [{x: 12, y: 4}, {x: 20, y: 12}, {x: 12, y: 20}, {x: 4, y: 12}, {x: 12, y: 4}]
};

const WorkflowNode = ({ step, color }: { step: any, color: string }) => {
  const statusColors = {
    'Completed': 'bg-green-500/20 border-green-400/50 text-green-400',
    'Running': 'bg-blue-500/20 border-blue-400/50 text-blue-400 animate-pulse',
    'Pending': 'bg-slate-500/20 border-slate-400/50 text-slate-400'
  }[step.status as 'Completed' | 'Running' | 'Pending'];

  return (
    <div 
      className="absolute w-64 h-32 -ml-32 -mt-16" 
      style={{ left: step.x, top: step.y, transformStyle: 'preserve-3d' }}
    >
      <div 
        className={`w-full h-full bg-slate-900/80 border-2 border-${color}-500/30 rounded-2xl backdrop-blur-xl shadow-2xl flex flex-col p-4 relative overflow-hidden`}
        style={{ transform: 'rotateZ(45deg) rotateX(-60deg)', transformOrigin: 'center' }}
      >
        <div className={`absolute top-0 left-0 w-1 h-full bg-${color}-500`}></div>
        <div className="flex justify-between items-start mb-2">
          <span className="text-white font-bold text-lg tracking-tight">{step.name}</span>
          <div className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusColors}`}>
            {step.status}
          </div>
        </div>
        <div className="mt-auto flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
            <img src={`https://i.pravatar.cc/150?u=${step.agent}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <span className="text-xs text-slate-400 font-mono">{step.agent}</span>
        </div>
        {/* Holographic scanning effect */}
        {step.status === 'Running' && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent w-full"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
        )}
      </div>
    </div>
  );
};

const DataStream = ({ x1, y1, x2, y2, color }: { x1: number, y1: number, x2: number, y2: number, color: string }) => {
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  return (
    <div 
      className="absolute h-1 origin-left pointer-events-none"
      style={{ 
        left: x1, 
        top: y1, 
        width: length, 
        transform: `rotateZ(${angle}deg)`,
        zIndex: 0
      }}
    >
      <div className={`w-full h-full bg-${color}-500/20 relative overflow-hidden`}>
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-${color}-400 to-transparent w-32`}
          animate={{ x: ['-100%', `${length}px`] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        />
      </div>
    </div>
  );
};

const activeAgentAnimation = [-10, -25, -10];
const activeAgentTransition = { repeat: Infinity, duration: 3, ease: "easeInOut" };
const scanningLineAnimation = ['-10%', '110%', '-10%'];
const scanningLineTransition = { repeat: Infinity, duration: 2.5, ease: "linear" };

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('boot');
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());
  
  // Agents App State
  const [agents, setAgents] = useState<any[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [isAddingAgent, setIsAddingAgent] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [workflowAgents, setWorkflowAgents] = useState<any[]>([]);
  const [activeWorkflowTeam, setActiveWorkflowTeam] = useState<string>('CODING');
  const [isWorkflowPromptOpen, setIsWorkflowPromptOpen] = useState(false);
  const [workflowTaskDescription, setWorkflowTaskDescription] = useState('');
  const [executionProgress, setExecutionProgress] = useState<number | null>(null);

  // Form State for New Agent
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentModel, setNewAgentModel] = useState('gpt-4-turbo');
  const [newAgentDirective, setNewAgentDirective] = useState('');
  const [newAgentTeam, setNewAgentTeam] = useState('CODING');

  const handleAddAgent = () => {
    if (!newAgentName || !newAgentDirective) return;
    
    const newAgent = {
      id: Math.random().toString(36).substr(2, 9),
      name: newAgentName,
      group: newAgentTeam,
      icon: newAgentTeam === 'CODING' ? Code : newAgentTeam === 'X TEAM' ? Zap : Brain,
      avatarUrl: `https://i.pravatar.cc/150?u=${newAgentName}`,
      iconColor: newAgentTeam === 'CODING' ? 'text-blue-400' : newAgentTeam === 'X TEAM' ? 'text-red-400' : 'text-pink-400',
      desc: newAgentDirective.toUpperCase(),
      status: 'Idle',
      uptime: '0s',
      tasks: 0,
      model: newAgentModel,
      logs: [`[SYS] Agent ${newAgentName} initialized.`, `[${new Date().toLocaleTimeString()}] INFO: Awaiting first directive.`]
    };

    setAgents([...agents, newAgent]);
    setIsAddingAgent(false);
    setNewAgentName('');
    setNewAgentDirective('');
  };

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (screen === 'boot') {
      const timer = setTimeout(() => setScreen('lock'), 2500);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  const goHome = () => {
    if (screen === 'app' || screen === 'lock') {
      setScreen('home');
      setTimeout(() => {
        setActiveApp(null);
        setSelectedAgentId(null);
        setIsAddingAgent(false);
        setZoom(1);
      }, 300); // clear after animation
    }
  };

  const formattedTime = time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const formattedDate = time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  const selectedAgent = agents.find(a => a.id === selectedAgentId);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-sans selection:bg-[#FBBF24] selection:text-black">
      {/* Status Bar */}
      <div className="absolute top-0 inset-x-0 h-12 flex justify-between items-center px-6 z-40 text-white pointer-events-none">
        <div className="text-[14px] font-semibold mt-1 ml-2">{formattedTime}</div>
        <div className="flex items-center gap-1.5 mt-1 mr-1">
          <Signal className="w-4 h-4" />
          <Wifi className="w-4 h-4" />
          <Battery className="w-5 h-5" />
        </div>
      </div>

      {/* Screen Content */}
      <div className="relative w-full h-full bg-black overflow-hidden">
        <AnimatePresence mode="wait">
          {screen === 'boot' && (
            <motion.div 
              key="boot"
              className="absolute inset-0 bg-black flex flex-col items-center justify-center z-30"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Rocket className="w-24 h-24 text-white animate-pulse mb-6" />
              <div className="text-[#FBBF24] font-mono tracking-widest text-sm">OPENCLAW OS v2.4</div>
            </motion.div>
          )}

          {screen === 'lock' && (
            <motion.div 
              key="lock"
              className="absolute inset-0 bg-[url('https://picsum.photos/seed/darkspace/1920/1080')] bg-cover bg-center z-20 flex flex-col items-center pt-32 pb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.5 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.y < -50) {
                  setScreen('home');
                }
              }}
            >
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
              <div className="relative z-10 flex flex-col items-center w-full">
                <div className="text-white/90 text-2xl font-medium mb-1">{formattedDate}</div>
                <div className="text-white text-[100px] font-light tracking-tighter leading-none">{formattedTime}</div>
              </div>
              
              <div className="relative z-10 mt-auto flex flex-col items-center gap-6 w-full px-12 max-w-4xl mx-auto">
                <div className="flex justify-between w-full mb-4">
                  <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
                    <Moon className="w-7 h-7 text-white" />
                  </div>
                  <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
                    <Rocket className="w-7 h-7 text-[#FBBF24]" />
                  </div>
                </div>
                <motion.div 
                  animate={{ y: [0, -5, 0] }} 
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-white/90 text-lg font-medium tracking-wide"
                >
                  Swipe up to initialize
                </motion.div>
              </div>
            </motion.div>
          )}

          {(screen === 'home' || screen === 'app') && (
            <motion.div 
              key="home"
              className="absolute inset-0 bg-[url('https://picsum.photos/seed/darkspace/1920/1080')] bg-cover bg-center z-10 pt-24 px-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="absolute inset-0 bg-black/60"></div>
              <div className="relative z-10 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-x-6 gap-y-10 max-w-5xl mx-auto">
                {apps.map(app => (
                  <div key={app.id} className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => { setActiveApp(app.id); setScreen('app'); }}>
                    <div className={`w-[72px] h-[72px] rounded-2xl ${app.color} flex items-center justify-center shadow-lg active:scale-95 transition-transform border border-white/10 group-hover:border-white/30`}>
                      <app.icon className="w-10 h-10 text-white" />
                    </div>
                    <span className="text-white text-sm font-medium drop-shadow-md">{app.name}</span>
                  </div>
                ))}
              </div>
              
              {/* Dock */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 h-[100px] bg-white/10 backdrop-blur-2xl rounded-[36px] flex items-center justify-center gap-6 px-6 z-10 border border-white/10 shadow-2xl">
                {apps.slice(0, 4).map(app => (
                  <div key={`dock-${app.id}`} className="flex flex-col items-center cursor-pointer group" onClick={() => { setActiveApp(app.id); setScreen('app'); }}>
                    <div className={`w-[72px] h-[72px] rounded-2xl ${app.color} flex items-center justify-center shadow-lg active:scale-95 transition-transform border border-white/10 group-hover:border-white/30`}>
                      <app.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* App Overlay */}
        <AnimatePresence>
          {screen === 'app' && activeApp === 'agents' && (
            <motion.div 
              key="app-agents"
              className="absolute inset-0 bg-[#0A0F1C] z-30 flex flex-col"
              initial={{ y: '100%', scale: 0.9, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: '100%', scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Header */}
              <div className="pt-16 px-8 pb-4 border-b border-slate-800/60 bg-[#0A0F1C] shrink-0 flex flex-col gap-4 w-full relative z-10 shadow-md">
                <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <button onClick={goHome} className="text-slate-400 hover:text-white transition-colors">
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#FBBF24]/10 border border-[#FBBF24]/30 flex items-center justify-center">
                        <Rocket className="w-6 h-6 text-[#FBBF24]" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-slate-100 tracking-tight">OpenClaw Mission Control</h1>
                        <p className="text-xs text-[#FBBF24] font-mono tracking-widest uppercase">System Active // 18 Agents Online</p>
                      </div>
                    </div>
                  </div>
                  
                  {!selectedAgentId && !isAddingAgent && (
                    <button 
                      onClick={() => setIsAddingAgent(true)}
                      className="bg-[#FBBF24] hover:bg-[#F59E0B] text-black px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(251,191,36,0.2)] hover:shadow-[0_0_25px_rgba(251,191,36,0.4)]"
                    >
                      <Plus className="w-5 h-5" /> Deploy Agent
                    </button>
                  )}
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 overflow-hidden w-full relative">
                <AnimatePresence mode="wait">
                  
                  {/* VIEW: ADD AGENT */}
                  {isAddingAgent && (
                    <motion.div 
                      key="add-agent"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="absolute inset-0 overflow-y-auto p-8"
                    >
                      <div className="max-w-3xl mx-auto">
                        <button 
                          onClick={() => setIsAddingAgent(false)}
                          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" /> Back to Dashboard
                        </button>
                        
                        <div className="bg-[#12182B] border border-slate-800 rounded-2xl p-8 shadow-xl">
                          <h2 className="text-2xl font-semibold text-white mb-6">Deploy New Agent</h2>
                          
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Agent Designation</label>
                                <input 
                                  type="text" 
                                  value={newAgentName}
                                  onChange={(e) => setNewAgentName(e.target.value)}
                                  placeholder="e.g. Data Analyzer" 
                                  className="w-full bg-[#0A0F1C] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FBBF24] transition-colors" 
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Core Model</label>
                                <select 
                                  value={newAgentModel}
                                  onChange={(e) => setNewAgentModel(e.target.value)}
                                  className="w-full bg-[#0A0F1C] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FBBF24] transition-colors appearance-none"
                                >
                                  <option>gpt-4-turbo</option>
                                  <option>gpt-4o</option>
                                  <option>claude-3-opus</option>
                                  <option>claude-3-sonnet</option>
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Assigned Team</label>
                                <select 
                                  value={newAgentTeam}
                                  onChange={(e) => setNewAgentTeam(e.target.value)}
                                  className="w-full bg-[#0A0F1C] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FBBF24] transition-colors appearance-none"
                                >
                                  <option value="CODING">CODING</option>
                                  <option value="X TEAM">X TEAM</option>
                                  <option value="KNOWLEDGE">KNOWLEDGE</option>
                                </select>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-slate-400">Primary Directive (Role)</label>
                              <input 
                                type="text" 
                                value={newAgentDirective}
                                onChange={(e) => setNewAgentDirective(e.target.value)}
                                placeholder="e.g. ANALYZES INCOMING DATA STREAMS" 
                                className="w-full bg-[#0A0F1C] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FBBF24] transition-colors" 
                              />
                            </div>
                            
                            <div className="pt-4 flex justify-end gap-4">
                              <button onClick={() => setIsAddingAgent(false)} className="px-6 py-3 rounded-lg text-slate-300 hover:bg-slate-800 font-medium transition-colors">Cancel</button>
                              <button onClick={handleAddAgent} className="px-8 py-3 rounded-lg bg-[#FBBF24] text-black font-bold hover:bg-[#F59E0B] transition-colors shadow-[0_0_15px_rgba(251,191,36,0.2)]">Initialize Sequence</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* VIEW: AGENT DETAILS */}
                  {!isAddingAgent && selectedAgent && (
                    <motion.div 
                      key="agent-detail"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="absolute inset-0 overflow-y-auto p-8"
                    >
                      <div className="max-w-6xl mx-auto flex flex-col gap-6">
                        <button 
                          onClick={() => setSelectedAgentId(null)}
                          className="flex items-center gap-2 text-slate-400 hover:text-white w-fit transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" /> Back to Dashboard
                        </button>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Left Column: Info & Controls */}
                          <div className="flex flex-col gap-6">
                            <div className="bg-[#12182B] border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FBBF24]/5 rounded-full blur-3xl"></div>
                              
                              <div className="flex items-center gap-4 mb-6 relative z-10">
                                <div className="relative w-16 h-16 rounded-xl border border-[#FBBF24]/50 bg-[#0A0F1C] flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.1)] overflow-hidden">
                                  <img src={selectedAgent.avatarUrl} alt={selectedAgent.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#0A0F1C] rounded-tl-lg flex items-center justify-center">
                                    <selectedAgent.icon className={`w-3.5 h-3.5 ${selectedAgent.iconColor}`} />
                                  </div>
                                </div>
                                <div>
                                  <h2 className="text-2xl font-bold text-white mb-1">{selectedAgent.name}</h2>
                                  <div className="flex items-center gap-2">
                                    <span className={`w-2.5 h-2.5 rounded-full ${selectedAgent.status === 'Active' ? 'bg-green-500 animate-pulse' : selectedAgent.status === 'Error' ? 'bg-red-500' : 'bg-yellow-500'}`}></span>
                                    <span className="text-sm text-slate-300 font-medium">{selectedAgent.status}</span>
                                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 ml-2">{selectedAgent.group}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mb-8 leading-relaxed">
                                {selectedAgent.desc}
                              </p>
                              
                              <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-[#0A0F1C] border border-slate-800 rounded-lg p-3">
                                  <div className="text-slate-500 text-xs mb-1 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> Uptime</div>
                                  <div className="text-white font-mono">{selectedAgent.uptime}</div>
                                </div>
                                <div className="bg-[#0A0F1C] border border-slate-800 rounded-lg p-3">
                                  <div className="text-slate-500 text-xs mb-1 flex items-center gap-1.5"><Activity className="w-3.5 h-3.5"/> Tasks</div>
                                  <div className="text-white font-mono">{selectedAgent.tasks}</div>
                                </div>
                                <div className="bg-[#0A0F1C] border border-slate-800 rounded-lg p-3 col-span-2">
                                  <div className="text-slate-500 text-xs mb-1 flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5"/> Core Model</div>
                                  <div className="text-[#FBBF24] font-mono text-sm">{selectedAgent.model}</div>
                                </div>
                              </div>

                              <div className="flex gap-3">
                                <button className="flex-1 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                                  <Play className="w-4 h-4" /> Start
                                </button>
                                <button className="flex-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                                  <Square className="w-4 h-4" /> Stop
                                </button>
                              </div>
                            </div>

                            <div className="bg-[#12182B] border border-slate-800 rounded-2xl p-6 shadow-xl">
                               <h3 className="text-white font-medium mb-4 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-slate-400"/> Security & Access</h3>
                               <div className="space-y-3">
                                 <div className="flex justify-between items-center text-sm">
                                   <span className="text-slate-400">Network Policy</span>
                                   <span className="text-green-400 font-mono bg-green-400/10 px-2 py-0.5 rounded">RESTRICTED</span>
                                 </div>
                                 <div className="flex justify-between items-center text-sm">
                                   <span className="text-slate-400">Filesystem</span>
                                   <span className="text-yellow-400 font-mono bg-yellow-400/10 px-2 py-0.5 rounded">READ-ONLY</span>
                                 </div>
                               </div>
                            </div>
                          </div>

                          {/* Right Column: Terminal */}
                          <div className="lg:col-span-2 bg-[#05080F] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col h-[600px]">
                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
                              <h3 className="text-white font-medium flex items-center gap-2">
                                <Terminal className="w-5 h-5 text-slate-400" /> Live Telemetry
                              </h3>
                              <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                              </div>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto font-mono text-sm space-y-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-800 [&::-webkit-scrollbar-track]:bg-transparent pr-4">
                              <div className="text-slate-500 mb-4">
                                OpenClaw OS Terminal v2.4.1<br/>
                                Connected to agent: {selectedAgent.id}@{selectedAgent.model}<br/>
                                Session ID: 0x8F92A1B
                              </div>
                              
                              {selectedAgent.logs.map((log, i) => (
                                <div key={i} className={`${log.includes('ERROR') ? 'text-red-400' : log.includes('WARN') ? 'text-yellow-400' : log.includes('SUCCESS') ? 'text-green-400' : log.includes('[SYS]') ? 'text-blue-400' : 'text-slate-300'}`}>
                                  {log}
                                </div>
                              ))}
                              
                              {selectedAgent.status === 'Active' && (
                                <div className="flex items-center gap-2 text-slate-500 mt-4">
                                  <span className="animate-pulse">_</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* VIEW: AGENT LIST (VIRTUAL OFFICE) */}
                  {!isAddingAgent && !selectedAgentId && (
                    <motion.div 
                      key="agent-list"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-[#020408] overflow-hidden"
                    >
                      <Stars />
                      
                      {/* Deep Space Nebula Background */}
                      <div className="absolute inset-0 pointer-events-none opacity-40">
                        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
                        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
                        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-indigo-500/5 rounded-full blur-[100px] animate-pulse delay-700"></div>
                      </div>
                      
                      {/* HUD Overlay */}
                      <div className="absolute top-0 inset-x-0 p-8 z-20 pointer-events-none">
                        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pointer-events-auto">
                          <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full sm:w-auto">
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#12182B]/80 backdrop-blur-md border border-blue-500/30 rounded-full text-sm font-medium text-slate-200 whitespace-nowrap shadow-[0_0_15px_rgba(59,130,246,0.2)] focus:outline-none focus:ring-2 focus:ring-blue-500">
                              <Monitor className="w-4 h-4 text-blue-400" /> CODING (6)
                            </button>
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#12182B]/60 backdrop-blur-md hover:bg-[#12182B]/80 border border-slate-700/50 rounded-full text-sm font-medium text-slate-400 transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-slate-500">
                              <Network className="w-4 h-4 text-red-400" /> X TEAM (6)
                            </button>
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#12182B]/60 backdrop-blur-md hover:bg-[#12182B]/80 border border-slate-700/50 rounded-full text-sm font-medium text-slate-400 transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-slate-500">
                              <Brain className="w-4 h-4 text-pink-400" /> KNOWLEDGE (6)
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="flex bg-[#12182B]/80 backdrop-blur-md border border-slate-700/50 rounded-full p-1 shadow-lg">
                              <button 
                                onClick={() => setZoom(prev => Math.max(0.5, prev - 0.1))}
                                className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                              >
                                <Plus className="w-5 h-5 rotate-45" />
                              </button>
                              <div className="w-12 flex items-center justify-center text-[10px] font-mono text-blue-400 font-bold">
                                {Math.round(zoom * 100)}%
                              </div>
                              <button 
                                onClick={() => setZoom(prev => Math.min(2, prev + 0.1))}
                                className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                              >
                                <Plus className="w-5 h-5" />
                              </button>
                            </div>

                            <div className="relative w-full sm:w-64">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <input 
                                type="text" 
                                placeholder="Search agents..." 
                                className="w-full bg-[#12182B]/80 backdrop-blur-md border border-slate-700/50 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500 text-slate-200 placeholder-slate-500 shadow-lg" 
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Pan Hint */}
                      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                        <div className="bg-black/60 backdrop-blur-md border border-white/10 text-slate-300 text-xs px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
                          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                          Drag to pan • Scroll to zoom • Click agent to view details
                        </div>
                      </div>

                      {/* 3D Office Draggable Area */}
                      <div 
                        className="absolute inset-0 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
                        onWheel={(e) => {
                          if (e.deltaY < 0) setZoom(prev => Math.min(2, prev + 0.05));
                          else setZoom(prev => Math.max(0.5, prev - 0.05));
                        }}
                      >
                        <motion.div 
                          drag
                          dragConstraints={{ left: -1500, right: 1500, top: -1500, bottom: 1500 }}
                          dragElastic={0.1}
                          className="relative w-0 h-0"
                          animate={{ scale: zoom }}
                          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                        >
                          {/* Isometric Floor */}
                          <div className="absolute w-[2400px] h-[2400px] -left-[1200px] -top-[1200px]"
                               style={{ transform: 'rotateX(60deg) rotateZ(-45deg)', transformStyle: 'preserve-3d' }}>
                            
                            {/* Starfield Background (Deep Space) */}
                            <div className="absolute -inset-[1000px] bg-[radial-gradient(circle_at_center,rgba(10,15,28,0)_0%,#05080F_70%)] pointer-events-none" style={{ transform: 'translateZ(-500px)' }}></div>
                            
                            {/* Floor Grid */}
                            <div className="absolute inset-0 bg-[#0A0F1C]/80 border-2 border-blue-500/30 shadow-[0_0_150px_rgba(59,130,246,0.15)] rounded-[60px] overflow-hidden"
                                 style={{ 
                                   backgroundImage: 'linear-gradient(to right, rgba(59,130,246,0.2) 2px, transparent 2px), linear-gradient(to bottom, rgba(59,130,246,0.2) 2px, transparent 2px)', 
                                   backgroundSize: '100px 100px',
                                   backdropFilter: 'blur(10px)'
                                 }}>
                              {/* Glowing Orbs in floor */}
                              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse"></div>
                              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
                              <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] animate-pulse delay-500"></div>
                            </div>

                            {/* Space Station Walls / Rails */}
                            <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-slate-800 to-slate-900 border border-blue-500/40 shadow-[0_0_50px_rgba(59,130,246,0.4)] rounded-t-[60px]" style={{ transform: 'translateZ(-20px)' }}></div>
                            <div className="absolute top-0 left-0 w-6 h-full bg-gradient-to-r from-slate-800 to-slate-900 border border-blue-500/40 shadow-[0_0_50px_rgba(59,130,246,0.4)] rounded-l-[60px]" style={{ transform: 'translateZ(-20px)' }}></div>
                            
                            {/* Structural Columns */}
                            <StructuralColumn x={0} y={0} />
                            <StructuralColumn x={2400} y={0} />
                            <StructuralColumn x={0} y={2400} />
                            <StructuralColumn x={2400} y={2400} />
                            <StructuralColumn x={1200} y={1200} />

                            {/* Hub Partitions */}
                            <GlassWall x1={400} y1={800} x2={800} y2={800} color="blue" />
                            <GlassWall x1={800} y1={400} x2={800} y2={800} color="blue" />
                            
                            <GlassWall x1={1600} y1={800} x2={2000} y2={800} color="red" />
                            <GlassWall x1={1600} y1={400} x2={1600} y2={800} color="red" />

                            <GlassWall x1={1000} y1={1600} x2={1400} y2={1600} color="pink" />
                            <GlassWall x1={1000} y1={1600} x2={1000} y2={2000} color="pink" />
                            <GlassWall x1={1400} y1={1600} x2={1400} y2={2000} color="pink" />

                            {/* Group Hubs */}
                            {[
                              { cx: 600, cy: 600, name: 'CODING', color: 'blue' },
                              { cx: 1800, cy: 600, name: 'X TEAM', color: 'red' },
                              { cx: 1200, cy: 1800, name: 'KNOWLEDGE', color: 'pink' }
                            ].map((hub, i) => (
                              <div key={`hub-${i}`} className="absolute w-96 h-96 -ml-48 -mt-48" style={{ left: hub.cx, top: hub.cy, transformStyle: 'preserve-3d' }}>
                                <div className={`absolute inset-0 rounded-full flex items-center justify-center ${hub.color === 'blue' ? 'bg-blue-500/5 border-4 border-blue-400/20' : hub.color === 'red' ? 'bg-red-500/5 border-4 border-red-400/20' : 'bg-pink-500/5 border-4 border-pink-400/20'}`}>
                                  <div className={`w-64 h-64 rounded-full animate-pulse blur-2xl ${hub.color === 'blue' ? 'bg-blue-400/10' : hub.color === 'red' ? 'bg-red-400/10' : 'bg-pink-400/10'}`}></div>
                                  <div className={`absolute inset-0 border rounded-full animate-[spin_20s_linear_infinite] ${hub.color === 'blue' ? 'border-blue-400/10' : hub.color === 'red' ? 'border-red-400/10' : 'border-pink-400/10'}`}></div>
                                </div>
                                {/* Label */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-4xl tracking-widest opacity-30" style={{ transform: 'rotateZ(45deg) rotateX(-60deg)' }}>
                                  {hub.name}
                                </div>
                              </div>
                            ))}

                            {/* Agents */}
                            {agents.length === 0 ? (
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center" style={{ transform: 'rotateZ(45deg) rotateX(-60deg)' }}>
                                <div className="text-slate-700 text-6xl font-black opacity-20 uppercase tracking-tighter">No Agents Deployed</div>
                              </div>
                            ) : (
                              agents.map((agent, idx) => {
                                const groupIdx = agent.group === 'CODING' ? 0 : agent.group === 'X TEAM' ? 1 : 2;
                              const posIdx = idx % 6;
                              const centers = [
                                { cx: 600, cy: 600 },
                                { cx: 1800, cy: 600 },
                                { cx: 1200, cy: 1800 }
                              ];
                              const { cx, cy } = centers[groupIdx];
                              const radius = 350;
                              const angle = (Math.PI * 2 / 6) * posIdx;
                              const x = cx + Math.cos(angle) * radius;
                              const y = cy + Math.sin(angle) * radius;
                              
                              return (
                                <div key={agent.id} className="absolute w-48 h-48 -ml-24 -mt-24" style={{ left: x, top: y, transformStyle: 'preserve-3d' }}>
                                  
                                  {/* High-Tech Workstation */}
                                  <Workstation agent={agent} x={0} y={0} color={groupIdx === 0 ? 'blue' : groupIdx === 1 ? 'red' : 'pink'} />
                                  
                                  {/* Billboarded Character */}
                                  <motion.div 
                                    className="absolute bottom-1/2 left-1/2 -translate-x-1/2 cursor-pointer group focus:outline-none"
                                    style={{ transform: 'rotateZ(45deg) rotateX(-60deg)', transformOrigin: 'bottom center', zIndex: 50 }}
                                    onClick={() => setSelectedAgentId(agent.id)}
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        setSelectedAgentId(agent.id);
                                      }
                                    }}
                                  >
                                    <div className="relative flex flex-col items-center">
                                      {/* Hover Info */}
                                      <div className="absolute -top-28 bg-[#0A0F1C]/90 backdrop-blur-2xl text-white px-6 py-5 rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-300 transform group-hover:-translate-y-4 group-focus:-translate-y-4 whitespace-nowrap pointer-events-none shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center gap-2 z-50 min-w-[180px]">
                                        <span className="font-bold text-xl text-[#FBBF24] tracking-tight">{agent.name}</span>
                                        <div className="flex items-center gap-2">
                                          <span className={`w-3 h-3 rounded-full ${agent.status === 'Active' ? 'bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]' : agent.status === 'Error' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]' : agent.status === 'Idle' ? 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]' : 'bg-slate-600'}`}></span>
                                          <span className="text-xs uppercase tracking-widest text-slate-200 font-black">{agent.status}</span>
                                        </div>
                                        <div className="text-[10px] text-blue-400 font-mono mt-1 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">{agent.model}</div>
                                      </div>
                                      
                                      {/* Character Animation */}
                                      <motion.div 
                                        animate={{ y: agent.status === 'Active' ? activeAgentAnimation : 0 }}
                                        transition={activeAgentTransition}
                                        className="relative"
                                        style={{ transform: 'translateZ(40px)' }}
                                      >
                                        {/* Character Body (FACE) */}
                                        <div className={`w-28 h-28 rounded-full flex items-center justify-center border-[4px] shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative overflow-hidden transition-all duration-500 group-hover:scale-110 group-focus:scale-110 group-focus:ring-4 group-focus:ring-[#FBBF24]/50
                                          ${agent.status === 'Active' ? 'border-blue-400 shadow-[0_0_40px_rgba(59,130,246,0.6)]' : 
                                            agent.status === 'Error' ? 'border-red-400 shadow-[0_0_40px_rgba(239,68,68,0.6)]' : 
                                            agent.status === 'Idle' ? 'border-yellow-400 shadow-[0_0_40px_rgba(234,179,8,0.4)]' : 
                                            'border-slate-500'}`}
                                        >
                                          {/* Avatar Image */}
                                          <img 
                                            src={agent.avatarUrl} 
                                            alt={agent.name} 
                                            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                                            referrerPolicy="no-referrer"
                                          />
                                          
                                          {/* Holographic Overlay */}
                                          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent pointer-events-none"></div>
                                          
                                          {/* Scanning Line Effect */}
                                          {agent.status === 'Active' && (
                                            <motion.div 
                                              className="absolute inset-x-0 h-2 bg-white/40 blur-[3px] z-20"
                                              animate={{ top: scanningLineAnimation }}
                                              transition={scanningLineTransition}
                                            />
                                          )}
                                        </div>

                                        {/* Avatar Badge */}
                                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#0A0F1C] rounded-full border-2 border-[#FBBF24]/50 flex items-center justify-center shadow-lg z-30">
                                          <agent.icon className={`w-4 h-4 ${agent.iconColor}`} />
                                        </div>
                                      </motion.div>
                                    </div>
                                  </motion.div>
                                </div>
                              );
                            })
                          )}

                            {/* Moving Maintenance Bots */}
                            <MaintenanceBot startX={2} startY={2} path={botPaths.bot1} delay={0} />
                            <MaintenanceBot startX={22} startY={12} path={botPaths.bot2} delay={3} />
                            <MaintenanceBot startX={12} startY={4} path={botPaths.bot3} delay={6} />

                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* App Router for others */}
          {screen === 'app' && activeApp !== 'agents' && activeApp !== null && (
            <motion.div 
              key="app-router"
              className="absolute inset-0 z-30 flex flex-col overflow-hidden"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Common App Header */}
              <div className={`pt-16 px-8 pb-4 border-b shrink-0 flex flex-col gap-4 w-full relative z-50 shadow-sm ${['workflows', 'activity', 'analytics', 'code'].includes(activeApp) ? 'bg-[#05080F]/90 border-white/10 text-white backdrop-blur-xl' : 'bg-white border-neutral-200 text-neutral-900'}`}>
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button onClick={goHome} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-2xl font-bold capitalize tracking-tight">{activeApp}</h1>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-xs font-mono opacity-60 uppercase tracking-widest">System Online</span>
                    </div>
                    <div className="text-xs font-mono opacity-60 uppercase tracking-widest">{time.toLocaleTimeString()}</div>
                  </div>
                </div>
              </div>

              {/* App Content */}
              <div className="flex-1 relative overflow-hidden bg-[#05080F]">
                {activeApp === 'workflows' && (
                  <div className="absolute inset-0 flex bg-[#05080F]">
                    {/* Left Side: Agent Selection */}
                    <div className="w-80 border-r border-white/10 flex flex-col bg-[#0A0F1C]/50 backdrop-blur-xl">
                      <div className="p-6 border-b border-white/10">
                        <h2 className="text-white font-bold text-lg mb-4">Available Agents</h2>
                        
                        {/* Team Tabs */}
                        <div className="flex bg-slate-900/80 p-1 rounded-xl border border-white/5">
                          {['CODING', 'X TEAM', 'KNOWLEDGE'].map((team) => (
                            <button
                              key={team}
                              onClick={() => setActiveWorkflowTeam(team)}
                              className={`flex-1 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all ${
                                activeWorkflowTeam === team 
                                  ? 'bg-blue-600 text-white shadow-lg' 
                                  : 'text-slate-500 hover:text-slate-300'
                              }`}
                            >
                              {team.split(' ')[0]}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                        {agents
                          .filter(agent => agent.group === activeWorkflowTeam)
                          .map((agent) => (
                          <motion.button
                            key={agent.id}
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              if (!workflowAgents.find(a => a.id === agent.id)) {
                                setWorkflowAgents([...workflowAgents, { ...agent, workflowId: Math.random().toString(36).substr(2, 9) }]);
                              }
                            }}
                            className="w-full bg-slate-900/40 border border-white/5 p-3 rounded-xl flex items-center gap-3 hover:bg-slate-800/60 transition-colors group text-left"
                          >
                            <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden shrink-0">
                              <img src={agent.avatarUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-white font-bold text-sm truncate">{agent.name}</div>
                              <div className="text-[10px] text-slate-500 uppercase tracking-tighter truncate">{agent.desc}</div>
                            </div>
                            <Plus className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Right Side: Workflow Builder */}
                    <div className="flex-1 flex flex-col relative overflow-hidden">
                      <div className="p-8 flex justify-between items-center">
                        <div>
                          <h2 className="text-white text-3xl font-black tracking-tight">Workflow Builder</h2>
                          <p className="text-slate-400 text-sm mt-1">Design your agent execution sequence by dragging components</p>
                        </div>
                        <div className="flex gap-3">
                          <button 
                            onClick={() => setWorkflowAgents([])}
                            className="px-6 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-bold hover:bg-red-500/20 transition-all"
                          >
                            Clear All
                          </button>
                          <button 
                            onClick={() => workflowAgents.length > 0 && setIsWorkflowPromptOpen(true)}
                            disabled={workflowAgents.length === 0}
                            className="px-8 py-2.5 rounded-xl bg-blue-600 border border-blue-500 text-white text-sm font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Play className="w-4 h-4" /> Execute Workflow
                          </button>
                        </div>
                      </div>

                      <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                        {workflowAgents.length === 0 ? (
                          <div className="h-full border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center justify-center text-center p-12">
                            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6 border border-white/10">
                              <SlidersHorizontal className="w-10 h-10 text-slate-700" />
                            </div>
                            <h3 className="text-white text-xl font-bold mb-2">Empty Pipeline</h3>
                            <p className="text-slate-500 max-w-xs">Select agents from the left panel to begin building your automated workflow sequence.</p>
                          </div>
                        ) : (
                          <Reorder.Group 
                            axis="y" 
                            values={workflowAgents} 
                            onReorder={setWorkflowAgents}
                            className="flex flex-col gap-4 max-w-2xl mx-auto"
                          >
                            {workflowAgents.map((agent, index) => (
                              <Reorder.Item
                                key={agent.workflowId}
                                value={agent}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="relative"
                              >
                                {/* Connection Line */}
                                {index < workflowAgents.length - 1 && (
                                  <div className="absolute left-10 top-full h-4 w-0.5 bg-gradient-to-b from-blue-500/50 to-transparent z-0"></div>
                                )}

                                <div className="bg-[#12182B] border border-white/10 rounded-2xl p-4 flex items-center gap-4 shadow-2xl relative z-10 group cursor-grab active:cursor-grabbing">
                                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-mono text-blue-400 font-bold border border-white/5 shrink-0">
                                    {index + 1}
                                  </div>
                                  
                                  <div className="w-12 h-12 rounded-xl border border-white/10 overflow-hidden shrink-0">
                                    <img src={agent.avatarUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                  </div>

                                  <div className="flex-1">
                                    <div className="text-white font-bold">{agent.name}</div>
                                    <div className="text-xs text-slate-400 flex items-center gap-2">
                                      <agent.icon className="w-3 h-3" />
                                      {agent.desc}
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-4">
                                    <div className="text-slate-600 group-hover:text-slate-400 transition-colors">
                                      <SlidersHorizontal className="w-5 h-5" />
                                    </div>
                                    <button 
                                      onClick={() => setWorkflowAgents(workflowAgents.filter(a => a.workflowId !== agent.workflowId))}
                                      className="p-2 hover:bg-red-500/10 rounded-xl text-slate-500 hover:text-red-400 transition-colors"
                                    >
                                      <Plus className="w-5 h-5 rotate-45" />
                                    </button>
                                  </div>
                                </div>
                              </Reorder.Item>
                            ))}
                          </Reorder.Group>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Workflow Prompt Modal */}
                <AnimatePresence>
                  {isWorkflowPromptOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsWorkflowPromptOpen(false)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                      />
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg bg-[#0A0F1C] border border-white/10 rounded-[32px] p-8 shadow-2xl overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                        
                        <h3 className="text-2xl font-black text-white mb-2">Workflow Instructions</h3>
                        <p className="text-slate-400 text-sm mb-6">Define the objectives for your selected agents. They will process these tasks in sequence.</p>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Primary Objective</label>
                            <textarea 
                              value={workflowTaskDescription}
                              onChange={(e) => setWorkflowTaskDescription(e.target.value)}
                              placeholder="e.g., Build a high-performance landing page with real-time analytics..."
                              className="w-full bg-slate-900/50 border border-white/10 rounded-2xl p-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 min-h-[120px] resize-none"
                            />
                          </div>
                          
                          <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 block mb-2">Pipeline Sequence</span>
                            <div className="flex flex-wrap gap-2">
                              {workflowAgents.map((a, i) => (
                                <div key={a.workflowId} className="flex items-center gap-1 bg-slate-800/50 px-2 py-1 rounded-lg border border-white/5">
                                  <span className="text-[10px] font-mono text-slate-500">{i + 1}</span>
                                  <span className="text-xs text-white font-bold">{a.name.split(' ')[0]}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-3 mt-8">
                          <button 
                            onClick={() => setIsWorkflowPromptOpen(false)}
                            className="flex-1 py-3 rounded-xl bg-slate-900 text-slate-400 font-bold hover:bg-slate-800 transition-all"
                          >
                            Cancel
                          </button>
                          <button 
                            onClick={() => {
                              setIsWorkflowPromptOpen(false);
                              setExecutionProgress(0);
                              // Simulate execution
                              const interval = setInterval(() => {
                                setExecutionProgress(prev => {
                                  if (prev === null || prev >= 100) {
                                    clearInterval(interval);
                                    return null;
                                  }
                                  return prev + 2;
                                });
                              }, 100);
                            }}
                            className="flex-2 py-3 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all"
                          >
                            Start Execution
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>

                {/* Execution Overlay */}
                <AnimatePresence>
                  {executionProgress !== null && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center p-12"
                    >
                      <div className="relative w-48 h-48 mb-12">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="96"
                            cy="96"
                            r="80"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-slate-800"
                          />
                          <motion.circle
                            cx="96"
                            cy="96"
                            r="80"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray="502.4"
                            animate={{ strokeDashoffset: 502.4 - (502.4 * (executionProgress ?? 0)) / 100 }}
                            className="text-blue-500"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-4xl font-black text-white">{executionProgress}%</span>
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mt-1">Processing</span>
                        </div>
                      </div>
                      
                      <div className="max-w-md w-full text-center">
                        <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Executing Pipeline</h3>
                        <div className="space-y-4">
                          {workflowAgents.map((agent, i) => {
                            const isActive = executionProgress !== null && executionProgress >= (i / workflowAgents.length) * 100 && executionProgress < ((i + 1) / workflowAgents.length) * 100;
                            const isDone = executionProgress !== null && executionProgress >= ((i + 1) / workflowAgents.length) * 100;
                            
                            return (
                              <motion.div 
                                key={agent.workflowId}
                                animate={{ opacity: isActive || isDone ? 1 : 0.3, scale: isActive ? 1.05 : 1 }}
                                className={`flex items-center gap-4 p-4 rounded-2xl border ${isActive ? 'bg-blue-500/10 border-blue-500/30' : 'bg-slate-900/50 border-white/5'}`}
                              >
                                <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${isDone ? 'bg-green-500 border-green-400 text-white' : 'bg-slate-800 border-white/10 text-slate-500'}`}>
                                  {isDone ? <ShieldCheck className="w-5 h-5" /> : <span className="text-xs font-mono">{i + 1}</span>}
                                </div>
                                <div className="flex-1 text-left">
                                  <div className="text-white font-bold text-sm">{agent.name}</div>
                                  <div className="text-[10px] text-slate-500 uppercase tracking-widest">{isActive ? 'Currently Handling Tasks...' : isDone ? 'Task Sequence Completed' : 'Awaiting Handover'}</div>
                                </div>
                                {isActive && <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>}
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => setExecutionProgress(null)}
                        className="mt-12 px-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 text-sm font-bold transition-all"
                      >
                        Abort Execution
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {activeApp === 'activity' && (
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="max-w-4xl w-full h-full flex flex-col gap-6">
                      <h2 className="text-white text-3xl font-bold tracking-tight">System Activity Feed</h2>
                      <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                        <div className="flex flex-col gap-4">
                          {activityLogs.map((log, i) => (
                            <motion.div 
                              key={log.id}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 flex items-center gap-6 hover:bg-slate-800/50 transition-all group"
                            >
                              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-800 border border-white/5 group-hover:scale-110 transition-transform`}>
                                <log.icon className="w-7 h-7 text-blue-400" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-white font-bold text-lg">{log.agent}</span>
                                  <span className="text-xs font-mono text-slate-500">{log.time}</span>
                                </div>
                                <p className="text-slate-400">{log.action}</p>
                              </div>
                              <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${
                                log.status === 'Success' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                                log.status === 'Error' ? 'bg-red-500/10 border-red-500/30 text-red-400' :
                                log.status === 'Warning' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' :
                                'bg-blue-500/10 border-blue-500/30 text-blue-400'
                              }`}>
                                {log.status}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeApp === 'knowledge' && (
                  <div className="absolute inset-0 flex flex-col p-8 bg-[#05080F]">
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h2 className="text-white text-3xl font-black tracking-tight">Knowledge Base</h2>
                        <p className="text-slate-400 text-sm mt-1">Centralized intelligence repository and documentation</p>
                      </div>
                      <button className="px-6 py-2.5 rounded-xl bg-blue-600 border border-blue-500 text-white text-sm font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-all flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Index New Data
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-6 overflow-y-auto pr-4 custom-scrollbar">
                      {[
                        { title: 'System Architecture', type: 'Technical Doc', size: '1.2 MB', date: '2h ago', icon: Network },
                        { title: 'API Reference v2', type: 'Specification', size: '450 KB', date: '5h ago', icon: Code },
                        { title: 'Market Analysis Q1', type: 'Research', size: '3.4 MB', date: '1d ago', icon: LineChart },
                        { title: 'Security Protocols', type: 'Compliance', size: '890 KB', date: '2d ago', icon: ShieldCheck },
                        { title: 'User Personas', type: 'UX Research', size: '2.1 MB', date: '3d ago', icon: Users },
                        { title: 'Deployment Guide', type: 'DevOps', size: '670 KB', date: '4d ago', icon: Rocket },
                      ].map((doc, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-[#0A0F1C] border border-white/10 rounded-[32px] p-6 hover:bg-slate-900/50 transition-all group cursor-pointer"
                        >
                          <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <doc.icon className="w-6 h-6 text-blue-400" />
                          </div>
                          <h3 className="text-white font-bold text-lg mb-1">{doc.title}</h3>
                          <p className="text-slate-500 text-xs mb-4 uppercase tracking-widest">{doc.type}</p>
                          <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <span className="text-[10px] font-mono text-slate-600">{doc.size}</span>
                            <span className="text-[10px] font-mono text-slate-600">{doc.date}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeApp === 'analytics' && (
                  <div className="absolute inset-0 flex flex-col p-8 bg-[#05080F]">
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h2 className="text-white text-3xl font-black tracking-tight">System Analytics</h2>
                        <p className="text-slate-400 text-sm mt-1">Real-time performance metrics and agent efficiency</p>
                      </div>
                      <div className="flex gap-2">
                        {['24H', '7D', '30D'].map(t => (
                          <button key={t} className={`px-4 py-1.5 rounded-lg text-[10px] font-black tracking-widest border transition-all ${t === '24H' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-white/5 text-slate-500'}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-6 mb-6">
                      {[
                        { label: 'Total Tasks', value: '12,405', change: '+12%', icon: ClipboardList },
                        { label: 'Avg Uptime', value: '99.98%', change: '+0.02%', icon: Clock },
                        { label: 'Active Nodes', value: agents.length, change: 'Stable', icon: Cpu },
                        { label: 'Data Throughput', value: '4.2 GB/s', change: '+18%', icon: Zap },
                      ].map((stat, i) => (
                        <div key={i} className="bg-[#0A0F1C] border border-white/10 rounded-[32px] p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
                              <stat.icon className="w-5 h-5 text-blue-400" />
                            </div>
                            <span className="text-[10px] font-black text-green-400">{stat.change}</span>
                          </div>
                          <div className="text-2xl font-black text-white">{stat.value}</div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex-1 bg-[#0A0F1C] border border-white/10 rounded-[40px] p-8 flex flex-col">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-white font-bold">Execution Velocity</h3>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest">Success</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest">Error</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 flex items-end gap-4">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-2">
                            <div className="w-full bg-slate-800 rounded-t-lg relative overflow-hidden" style={{ height: `${h}%` }}>
                              <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: '100%' }}
                                transition={{ delay: i * 0.05, duration: 1 }}
                                className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-blue-600 to-blue-400"
                              />
                            </div>
                            <span className="text-[8px] font-mono text-slate-600">0{i}:00</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeApp === 'code' && (
                  <div className="absolute inset-0 flex flex-col bg-[#05080F]">
                    <div className="h-12 border-b border-white/10 flex items-center px-6 justify-between bg-[#0A0F1C]">
                      <div className="flex items-center gap-4">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                        </div>
                        <div className="h-12 px-4 border-x border-white/5 flex items-center gap-2 bg-slate-900/50">
                          <Code className="w-4 h-4 text-blue-400" />
                          <span className="text-xs text-slate-300 font-mono">main.tsx</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono text-slate-600">UTF-8</span>
                        <span className="text-[10px] font-mono text-slate-600">TypeScript</span>
                      </div>
                    </div>
                    <div className="flex-1 flex">
                      <div className="w-12 border-r border-white/5 flex flex-col items-center py-4 gap-4 text-slate-700 font-mono text-[10px]">
                        {Array.from({ length: 25 }).map((_, i) => <div key={i}>{i + 1}</div>)}
                      </div>
                      <div className="flex-1 p-6 font-mono text-sm overflow-y-auto custom-scrollbar">
                        <div className="text-purple-400">import <span className="text-blue-400">React</span> from <span className="text-green-400">'react'</span>;</div>
                        <div className="text-purple-400">import <span className="text-blue-400">{`{ motion }`}</span> from <span className="text-green-400">'framer-motion'</span>;</div>
                        <div className="mt-4 text-slate-500">// Initialize system core</div>
                        <div className="text-purple-400">const <span className="text-blue-400">App</span> = () ={`>`} {`{`}</div>
                        <div className="pl-4 text-purple-400">const <span className="text-blue-400">[agents, setAgents]</span> = useState([]);</div>
                        <div className="pl-4 mt-2 text-slate-500">// ... system logic</div>
                        <div className="pl-4 text-purple-400">return (</div>
                        <div className="pl-8 text-blue-400">{`<div className="system-grid">`}</div>
                        <div className="pl-12 text-blue-400">{`{agents.map(agent => (`}</div>
                        <div className="pl-16 text-blue-400">{`<AgentCard key={agent.id} data={agent} />`}</div>
                        <div className="pl-12 text-blue-400">{`))}`}</div>
                        <div className="pl-8 text-blue-400">{`</div>`}</div>
                        <div className="pl-4 text-purple-400">);</div>
                        <div className="text-purple-400">{`};`}</div>
                        <div className="mt-4 text-purple-400">export default <span className="text-blue-400">App</span>;</div>
                        <motion.div 
                          animate={{ opacity: [1, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8 }}
                          className="inline-block w-2 h-5 bg-blue-500 ml-1 align-middle"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeApp === 'settings' && (
                  <div className="absolute inset-0 flex flex-col p-8 bg-[#05080F]">
                    <div className="max-w-2xl mx-auto w-full">
                      <h2 className="text-white text-3xl font-black tracking-tight mb-8">System Settings</h2>
                      
                      <div className="space-y-8">
                        <section>
                          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Core Configuration</h3>
                          <div className="bg-[#0A0F1C] border border-white/10 rounded-3xl overflow-hidden">
                            {[
                              { label: 'Neural Processing Units', value: 'Enabled', icon: Cpu },
                              { label: 'Quantum Encryption', value: 'Active', icon: ShieldCheck },
                              { label: 'Auto-Scaling Nodes', value: 'Disabled', icon: Network },
                            ].map((item, i) => (
                              <div key={i} className="flex items-center justify-between p-6 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
                                    <item.icon className="w-5 h-5 text-blue-400" />
                                  </div>
                                  <span className="text-white font-bold">{item.label}</span>
                                </div>
                                <div className="w-12 h-6 bg-slate-800 rounded-full relative cursor-pointer">
                                  <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${item.value === 'Enabled' || item.value === 'Active' ? 'right-1 bg-blue-500' : 'left-1 bg-slate-600'}`}></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </section>

                        <section>
                          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Danger Zone</h3>
                          <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-6 flex items-center justify-between">
                            <div>
                              <h4 className="text-red-400 font-bold">Purge All Agents</h4>
                              <p className="text-red-500/60 text-xs">This action will immediately terminate all active agent processes.</p>
                            </div>
                            <button 
                              onClick={() => {
                                setAgents([]);
                                setWorkflowAgents([]);
                              }}
                              className="px-6 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-all"
                            >
                              Purge System
                            </button>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-2 inset-x-0 h-4 flex justify-center items-center z-50 cursor-pointer" onClick={goHome}>
        <div className="w-1/3 max-w-[200px] h-1.5 bg-white/80 rounded-full hover:bg-white transition-colors shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>
      </div>
    </div>
  );
}
