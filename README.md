## MarkSite - An ASP.NET based Markdown CMS

A great system for:

- Community driven documentation
- A personal website
- Company website with multiple contributors

[![Build status](https://ci.appveyor.com/api/projects/status/os59p2cm7s2wk3sr?svg=true)](https://ci.appveyor.com/project/madskristensen/marksite)

[![Deploy to Azure](http://azuredeploy.net/deploybutton.png)](https://azuredeploy.net/)

Live demo: [vwd.azurewebsites.net](http://vwd.azurewebsites.net)

### Features

- Uses the folder structure to create the menu
- Convension based file/folder structure
- Each page has a link to `Edit this page on GitHub`
- Everything is configurable from `web.config`
- Semantic URLs
- Each `.md` file can contain configuration
- AppVeyor integration
	- Automatically validates any pull request
	- Checks for missing metadata
- Theming support


### Getting started

The website itself is really simple. It only consist of a single
`index.cshtml` file. The entire site is built up around Markdown (`.md`) files
located inside the `pages` directory by default.

#### Folder structure

The folder structure determines how the menu is constructed as well as the
URLs to each page.

![Folder structure](https://raw.githubusercontent.com/madskristensen/MarkSite/master/art/folder-structure.png)

Each folder MUST have a file called `index.md` with the exception of folders starting
with an underscore (example: `/pages/_images/`).

#### Metadata

Each `.md` file has a bit of metadata at the top that allows you to customize
various aspects of the file.

```HTML
<properties
	pageTitle="FTP"
	description="bla bla bla"
	slug="ftp"
	keywords="ftp, deploy"
/>

My markdown content goes here
```

__pageTitle__: The title of each page  
__description__: The description of each page  
__keywords__: A comma separated list of keywords  
__slug__: A Slug is what the URL should be

#### Screenshots/animated GIFs

To maintain a consistent look to all the screenshots/animated GIFs,
please adhere to these Visual Studio settings:

__Font__: 12pt Consolas  
__Theme__: Light

Also, please make sure to have a ~5 pixel padding when making an 
animated GIF from one of the editors, so the things you
show aren't located all the way at the edges of the
image, but about 5 pixels from the top and left.

The padding rule only applies to screenshots/animated GIFs taken
inside the editors.

The width of any screenshot/animated GIF, make sure to keep them at
a maximum of 600 pixels wide.

#### Validation

To help make sure that each pull request meets the requirements of the metadata,
the validator helps guide the contributors to write valid `.md` files for 
the MarkSite instance.

When using AppVeyor, each pull requests is automatically being build and the 
validator will automatically fail the build in case the pull request isn't
satisfying the validator.