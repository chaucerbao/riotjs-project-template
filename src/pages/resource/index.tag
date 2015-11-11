import "./style";
import "modules/module";
import Library from "lib/library";

<resource>
  <h1>{resource.name} (#{resource.id})</h1>

  <p>Library function: {result}</p>

  <module />

  let self = this;

  // The data needed for this tag
  self.resource = {};
  self.result = Library.add(16, 29);

  // This tag's event handlers
  self.on("mount", () => {
    dispatcher.on("resource:item-loaded", self.onResourceLoaded);
    dispatcher.trigger("resource:load-item", opts.id);
  });

  self.on("unmount", () => {
    dispatcher.off("resource:item-loaded", self.onResourceLoaded);
  });

  // The dispatcher's event callbacks
  self.onResourceLoaded = (resource) => {
    self.resource = resource;
    self.update();
  };
</resource>
