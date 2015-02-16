# ghost-next-prev-links
JavaScript hack for adding Next &amp; Previous Post links to your Ghost theme. No changes to core required.

## Thanks

Thanks to GitHub user [jyek](https://gist.github.com/jyek) for his [original gist](https://gist.github.com/jyek/5141bc6166b01419d43f). I cleaned up the code slightly and made some small improvements.

## Instructions

**Step 1** - Place jquery.ghost-next-prev-links.js in assets/js/

**Step 2** - Insert this into post.hbs.

```html
<section class="post-next-prev clearfix">
    <span id="curr-post-uuid" style="display: none;">{{uuid}}</span>
    <a class="next-post"></a>
    <a class="prev-post"></a>
</section>
```

**Step 3** - Insert this into default.hbs.

```html
<script type="text/javascript" src="{{asset "js/jquery.ghost-next-prev-links.js"}}"></script>
```
 
**Step 4** - Insert this into your style.scss file. (You're using SASS, right?)

``scss
/* Next and Previous Post links */
 
.post-next-prev {
    padding: 3rem 0 0 0;
 
    * { display: none; }
    a { max-width: 50%; }
    
    .next-post {
        float: left;
 
        &:before { content: '← '; }
    }
    .prev-post {
        float: right;
        text-align: right;
 
        &:after { content: ' →'; }
    }
}
```

**Step 5** - Get off yer butt, modify core, and submit your changes to TryGhost!

