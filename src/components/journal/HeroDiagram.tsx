// Abstract line-drawn network topology. Decorative only.
const nodes: [number, number][] = [[60,70],[190,40],[320,95],[110,190],[250,210],[370,230],[180,310],[320,330],[60,300]];
const edges: [number, number][] = [[0,1],[1,2],[0,3],[1,4],[2,5],[3,4],[4,5],[3,6],[4,7],[6,7],[3,8],[8,6],[2,4]];
export function HeroDiagram() {
  return (
    <svg viewBox="0 0 420 380" className="h-full w-full" aria-hidden="true">
      <defs>
        <pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="var(--border)" strokeWidth=".6" /></pattern>
      </defs>
      <rect width="420" height="380" fill="url(#g)" />
      {edges.map(([a,b],i)=>(
        <line key={i} x1={nodes[a]![0]} y1={nodes[a]![1]} x2={nodes[b]![0]} y2={nodes[b]![1]}
          stroke="var(--primary)" strokeWidth="1" strokeDasharray={i%3===0?"4 4":undefined}
          className="animate-draw" style={{animationDelay:`${i*0.12}s`}} />
      ))}
      {nodes.map(([x,y],i)=>(
        <g key={i}>
          <circle cx={x} cy={y} r={i===4?14:7} fill="var(--background)" stroke="var(--deep)" strokeWidth="1" />
          <circle cx={x} cy={y} r={i===4?5:2.5} fill="var(--primary)" className="animate-node" style={{animationDelay:`${i*0.35}s`}} />
          <text x={x+12} y={y-10} fontFamily="var(--font-mono)" fontSize="8" fill="var(--muted-foreground)">10.0.{i}.1</text>
        </g>
      ))}
      <rect x="225" y="185" width="50" height="50" fill="none" stroke="var(--primary)" strokeDasharray="2 3" />
      <text x="282" y="200" fontFamily="var(--font-mono)" fontSize="8" fill="var(--primary)">↳ inspect</text>
    </svg>
  );
}
