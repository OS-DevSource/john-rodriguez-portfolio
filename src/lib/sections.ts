export type ControlRoomSection = {
  id: "home" | "about" | "projects" | "toolbox" | "contact";
  label: string;
  commandLabel: string;
};

export const controlRoomSections: ControlRoomSection[] = [
  { id: "home", label: "Home", commandLabel: "Go to Home" },
  { id: "about", label: "About", commandLabel: "Load About Module" },
  { id: "projects", label: "Projects", commandLabel: "Load Projects Module" },
  { id: "toolbox", label: "Toolbox", commandLabel: "Load Toolbox Module" },
  { id: "contact", label: "Contact", commandLabel: "Open Contact Module" },
];
