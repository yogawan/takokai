import ProtectedImage from "./ProtectedImage";

const ChatHeader = () => (
  <div className="pl-5 pr-5 pb-5 bg-none">
    <ProtectedImage
      src="/branding/logo.png"
      alt="logo"
      className="h-16 mb-3"
    />
    <p className="mb-3 text-white text-left text-xl font-medium">Hi, i'm JawirAI</p>
    <p className="text-xs text-white/50">
      Open Source User Interface to Interact with AI Model.
    </p>
  </div>
);

export default ChatHeader;