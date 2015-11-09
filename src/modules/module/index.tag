import "./style";
import Library from "lib/library";

<module>
  <h1>Module</h1>

  <p>Library function: {result}</p>

  <ul if={resources}>
    <li each={resources}><a href="/resource/{id}">{name}</a></li>
  </ul>

  let self = this;

  // The data needed for this tag
  self.resources = [];
  self.result = Library.add(33, 48);

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
</module>
