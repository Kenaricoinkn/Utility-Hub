
FROM libretranslate/libretranslate:latest
ENV LT_LOAD_AUTO_DOWNLOAD_MODELS=true
# Railway uses PORT env; expose 5000 default, but we'll listen on 0.0.0.0:$PORT
CMD ["bash", "-lc", "libretranslate --host 0.0.0.0 --port ${PORT:-5000}"]
