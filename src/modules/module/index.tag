import "./style";
import Library from "lib/library";

<module>
  <h1>Module</h1>

  <p>Library function: {result}</p>

  <ul if={resources}>
    <li each={resources}>{name}</li>
  </ul>

  let self = this;

  // The data needed for this tag
  self.resources = [];
  self.result = Library.add(33, 48);

  // This tag's event handlers
  self.on("mount", () => {
    dispatcher.on("resource:loaded", self.onResourceLoaded);
    dispatcher.trigger("resource:load");
    console.log("Module mounted");
  });

  self.on("unmount", () => {
    dispatcher.off("resource:loaded", self.onResourceLoaded);
    console.log("Module unmounted");
  });

  // The dispatcher's event handlers for this tag
  self.onResourceLoaded = (resource) => {
    self.resources = resource.items;
    self.update();
    console.log("Module resources rendered");
  };
</module>
