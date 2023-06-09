const { HTTP_STATUS } = require("../utils/http");
const router = require("express").Router();
const { SearchBarManager } = require("../managers/search_bar_manager");
const { SongsManager } = require("../managers/songs_manager");
const { PlaylistManager } = require("../managers/playlist_manager");

const songsManager = new SongsManager();
const playlistManager = new PlaylistManager();

const searchBarManager = new SearchBarManager(songsManager, playlistManager);

router.get("/", async (request, response) => {
  try {
    const exact = request.query.exact === "true";
    const searchQuery = request.query.search_query;
    response.status(HTTP_STATUS.SUCCESS).json(await searchBarManager.search(searchQuery, exact));
  } catch (error) {
    response.status(HTTP_STATUS.SERVER_ERROR).send(error);
  }
});

module.exports = { router, searchBarManager };
