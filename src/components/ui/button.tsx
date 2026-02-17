import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-dark rounded-md",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md",
        outline: "border border-input bg-background hover:bg-accent/10 hover:text-primary rounded-md",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md",
        ghost: "hover:bg-accent/10 hover:text-primary rounded-md",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-primary text-primary-foreground hover:bg-primary-dark rounded-full font-semibold shadow-dental hover:shadow-dental-hover",
        heroOutline: "border-2 border-primary text-primary hover:bg-primary/5 rounded-full font-semibold",
        gold: "bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-semibold shadow-dental btn-pulse",
        goldSolid: "bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-semibold",
        white: "bg-background text-primary font-bold rounded-full shadow-dental hover:shadow-dental-hover",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
