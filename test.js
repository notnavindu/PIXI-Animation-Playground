var app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xffffff,
  autoDensity: true,
  antialias: true
});

document.body.appendChild(app.view);

// Load the bunny texture
app.loader.add("avatar", "./150.jpg").load(startup);

function startup() {
  var avatar = new PIXI.Sprite(app.loader.resources.avatar.texture);

  // Center the sprite's anchor point
  avatar.anchor.set(0.5);

  // Move the sprite to the center of the screen
  avatar.x = app.renderer.width / 2;
  avatar.y = app.renderer.height / 2;
  avatar.angle = -30;
  avatar.width = 200;
  avatar.height = 200;
  app.stage.addChild(avatar);

  const mask = new PIXI.Graphics();

  mask.beginFill(0xff3300);

  mask.drawCircle(
    app.renderer.width / 2,
    app.renderer.height / 2,
    avatar.width
  );
  mask.endFill();
  maskSprite = new PIXI.Sprite(app.renderer.generateTexture(mask));
  maskSprite.anchor.set(0.5);
  maskSprite.scale.set(0);
  //set the mask's position
  maskSprite.x = avatar.x;
  maskSprite.y = avatar.y;

  app.stage.addChild(maskSprite);
  avatar.mask = maskSprite;

  var dropShadowFilter = new PIXI.filters.DropShadowFilter({
    blur: 3,
    distance: 5,
    alpha: 0,
    quality: 10
  });
  dropShadowFilter.padding = 15;

  avatar.filters = [dropShadowFilter];
  turn(avatar, maskSprite, dropShadowFilter);
}

function turn(avatar, mask, ds) {
  const e = Ease.ease.add(
    avatar,
    { rotation: 0 },
    { duration: 800, ease: "easeOutQuad" }
  ); //, removeExisting })
  e.once("complete", () => {
    console.log("done");
  });
  const m = Ease.ease.add(
    mask,
    { scale: 0.5 },
    { duration: 800, ease: "easeOutQuad" }
  ); //, removeExisting })
  m.once("complete", () => {
    const a = Ease.ease.add(
      ds,
      { alpha: 0.5 },
      { duration: 500, ease: "easeOutQuad" }
    ); //, removeExisting })
    a.once("complete", () => {
      console.log("done");
    });
  });
}
