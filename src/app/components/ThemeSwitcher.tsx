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
    <div>
      <Button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        isIconOnly
        color="warning"
        variant="faded"
        aria-label="Light Mode"
      >
        {theme === "light" ? <Moon size={30} /> : <SunMoon size={30} />}
      </Button>
    </div>
  );
}
