import "./style";
import "modules/module";
import Library from "lib/library";

<homepage>
  <h1>Homepage</h1>

  <p>Library function: {result}</p>

  <ul if={resources}>
    <li each={resources}><a href="#/resource/{id}">{name}</a></li>
  </ul>

  <module />

  let self = this;

  // The data needed for this tag
  self.resources = [];
  self.result = Library.add(2, 3);

  // This tag's event handlers
  self.on("mount", () => {
    dispatcher.on("resource:items-loaded", self.onResourcesLoaded);
    dispatcher.trigger("resource:load-items");
  });

  self.on("unmount", () => {
    dispatcher.off("resource:items-loaded", self.onResourcesLoaded);
  });

  // The dispatcher's event callbacks
  self.onResourcesLoaded = (resources) => {
    self.resources = resources;
    self.update();
  };
</homepage>
