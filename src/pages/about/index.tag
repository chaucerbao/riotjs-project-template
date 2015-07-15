import "./style";
import "modules/module";
import Library from "lib/library";

<about>
  <h1>About</h1>

  <p>Library function: {result}</p>

  <ul if={resources}>
    <li each={resources}>{name}</li>
  </ul>

  <module></module>

  let self = this;

  // The data needed for this tag
  self.resources = [];
  self.result = Library.add(16, 29);

  // This tag's event handlers
  self.on("mount", () => {
    dispatcher.on("resource:loaded", self.onResourceLoaded);
    dispatcher.trigger("resource:load");
    console.log("About mounted");
  });

  self.on("unmount", () => {
    dispatcher.off("resource:loaded", self.onResourceLoaded);
    console.log("About unmounted");
  });

  // The dispatcher's event handlers for this tag
  self.onResourceLoaded = (resource) => {
    self.resources = resource.items;
    self.update();
    console.log("About resources rendered");
  };
</about>
