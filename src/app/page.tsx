import { Button, Card } from "@nextui-org/react";
import { ThemeSwitcher } from "./components/ThemeSwitcher";

export default function Home() {
  return (
    <Card className="flex h-full justify-center items-center mx-auto my-56">
      <ThemeSwitcher />      
      <Button>Click Me</Button>
    </Card>
  );
}
