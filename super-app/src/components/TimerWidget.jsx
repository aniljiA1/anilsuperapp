import { useEffect, useRef, useState } from "react";

const pad = (num) => String(num).padStart(2, "0");

const TimerWidget = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            setFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const totalInput = hours * 3600 + minutes * 60 + seconds;

  const handleStart = () => {
    setFinished(false);
    if (remaining === 0) setRemaining(totalInput || 0);
    setRunning(true);
  };

  const handlePause = () => setRunning(false);

  const handleReset = () => {
    setRunning(false);
    setFinished(false);
    setRemaining(0);
  };

  const displaySeconds = running || remaining > 0 ? remaining : totalInput;
  const dh = Math.floor(displaySeconds / 3600);
  const dm = Math.floor((displaySeconds % 3600) / 60);
  const ds = displaySeconds % 60;

  return (
    <div className="bg-[#1c1c1c] rounded-2xl p-6 h-full flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Timer</h3>

      <div className="text-center text-4xl font-mono font-bold tracking-wider text-[#7ee787]">
        {pad(dh)}:{pad(dm)}:{pad(ds)}
      </div>

      {finished && (
        <p className="text-center text-amber-400 font-semibold">⏰ Time's up!</p>
      )}

      {!running && remaining === 0 && (
        <div className="flex justify-center gap-2">
          {[
            { label: "H", value: hours, setter: setHours, max: 23 },
            { label: "M", value: minutes, setter: setMinutes, max: 59 },
            { label: "S", value: seconds, setter: setSeconds, max: 59 },
          ].map(({ label, value, setter, max }) => (
            <div key={label} className="flex flex-col items-center">
              <input
                type="number"
                min={0}
                max={max}
                value={value}
                onChange={(e) =>
                  setter(Math.min(max, Math.max(0, Number(e.target.value) || 0)))
                }
                className="field-input w-16 text-center"
              />
              <span className="text-xs text-gray-500 mt-1">{label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        {!running ? (
          <button onClick={handleStart} className="btn-primary">
            {remaining > 0 ? "Resume" : "Start"}
          </button>
        ) : (
          <button onClick={handlePause} className="btn-primary" style={{ background: "#f0a500" }}>
            Pause
          </button>
        )}
        <button
          onClick={handleReset}
          className="btn-primary"
          style={{ background: "#2e2e2e", color: "#f1f1f1" }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TimerWidget;
