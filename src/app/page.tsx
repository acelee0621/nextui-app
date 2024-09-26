import { Button } from "@nextui-org/react";
import { ThemeSwitcher } from "./components/ThemeSwitcher";

export default function Home() {
  return (
    <div>
      <ThemeSwitcher />      
      <Button>Click Me</Button>
    </div>
  );
}
