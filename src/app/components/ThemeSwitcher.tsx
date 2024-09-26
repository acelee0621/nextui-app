// app/components/ThemeSwitcher.tsx
"use client";

import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, SunMoon } from "lucide-react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="text-lg text-purple-400 gap-4 flex">
      The current theme is: {theme}
      <Button
        onClick={() => setTheme("light")}
        isIconOnly
        color="warning"
        variant="faded"
        aria-label="Light Mode"
      >
        <SunMoon />
      </Button>
      <Button
        onClick={() => setTheme("dark")}
        isIconOnly
        color="secondary"
        variant="faded"
        aria-label="Dark Mode"
      >
        <Moon />
      </Button>
    </div>
  );
}
