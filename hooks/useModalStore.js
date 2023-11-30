const { create } = require("zustand");

export const modalTypes = [
  "createServer",
  "invite",
  "editServer",
  "members",
  "createChannel",
  "leaveServer",
  "deleteServer",
  "deleteChannel",
  "editChannel",
  "messageFile",
  "deleteMessage",
];

export const useModal = create((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));


