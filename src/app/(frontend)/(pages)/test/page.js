import { DialogCloseButton } from "../../(components)/modal";

function ParentComponent() {
  const handleButtonClick = () => {
    console.log("Button clicked");
  };

  return (
    <div>
      <DialogCloseButton />
    </div>
  );
}

export default ParentComponent;
