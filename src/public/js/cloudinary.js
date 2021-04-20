const options = {
    cloudName: 'dys6vbws3',
    uploadPreset: 'ml_default',
    multiple: false,
    sources: ["local", "url", "camera", "facebook"],
    language: "es",
    text: {
        "es": {
            "or": 'o',
            "menu": {
                "files": "Mis archivos",
                "web": "Dirección web",
                "camera": "Cámara",
                "facebook": "Facebook",
            },
            "selection_counter": {
                "selected": "Seleccionadas"
            },
            "actions": {
                "upload": "Subir",
                "clear_all": "Eliminar todas",
                "log_out": "Salir"
            },
            "notifications": {
                "general_error": "An error has occurred.",
                "general_prompt": "Are you sure?",
                "limit_reached": "No more files can be selected.",
                "invalid_add_url": "The URL must be valid.",
                "invalid_public_id": "Public ID cannot contain \\,?,&,#,%,<,>.",
                "no_new_files": "The files have already been uploaded.",
                "image_purchased": "Image Purchased",
                "video_purchased": "Video Purchased",
                "purchase_failed": "Purchase failed. Please try again.",
                "service_logged_out": "Service logged out due to error",
                "great": "Great"
            },
            "advanced_options": {
                "public_id_ph": "Public ID",
                "tags_ph": "Add a tag",
                "add_new": "Add a new tag:",
                "upload_preset_placeholder": "Upload Preset"
            },
            "landscape_overlay": {
                "title": "Landscape mode isn't supported",
                "description": "Rotate your device back to portrait mode to continue."
            },
            "queue": {
                "title": "Upload Queue",
                "title_uploading_with_counter": "Subiendo {{num}} imágen(es)",
                "title_uploading": "Subiendo imágen(es)",
                "mini_title": "Uploaded",
                "mini_title_uploading": "Uploading",
                "show_completed": "Show completed",
                "retry_failed": "Retry failed",
                "abort_all": "Abort all",
                "upload_more": "Upload more",
                "done": "Done",
                "mini_upload_count": "{{num}} uploaded",
                "mini_failed": "{{num}} failed",
                "statuses": {
                    "uploading": "Uploading...",
                    "error": "Error",
                    "uploaded": "Done",
                    "aborted": "Aborted"
                }
            },
            "uploader": {
                "filesize": {
                    "na": "N/A",
                    "b": "{{size}} Bytes",
                    "k": "{{size}} KB",
                    "m": "{{size}} MB",
                    "g": "{{size}} GB",
                    "t": "{{size}} TB"
                },
                "errors": {
                    "file_too_large": "File size ({{size}}) exceeds maximum allowed ({{allowed}})",
                    "max_dimensions_validation": "Image dimensions ({{width}}X{{height}}) are bigger than the maximum allowed: ({{maxWidth}}X{{maxHeight}})",
                    "min_dimensions_validation": "Image dimensions ({{width}}X{{height}}) are smaller than the minimum required: ({{minWidth}}X{{minHeight}})",
                    "unavailable": "NA"
                }
            },
            "crop": {
                "title": "Crop",
                "crop_btn": "Crop",
                "skip_btn": "Skip",
                "cancel_btn": "Cancel",
                "reset_btn": "Reset",
                "close_btn": "Close",
                "close_prompt": "Closing will cancel all uploads, Are you sure?",
                "image_error": "Error loading image",
                "corner_tooltip": "Drag corner to resize",
                "handle_tooltip": "Drag handle to resize"
            },
            "camera": {
                "main_title": "Cámara",
                "capture": "Capturar",
                "cancel": "Cancelar",
                "take_pic": "Toma una foto y súbela",
                "explanation": "Asegúrese de que su cámara esté conectada y que su navegador tenga permiso para acceder a ella. Cuando esté listo, haga clic en Capturar.",
                "camera_error": "Error al intentar acceder a la cámara",
                "retry": "Reintentar",
                "file_name": "Camera_{{time}}"
            },
            "dropbox": {
                "main_title": "Dropbox",
                "no_auth_title": "Upload files from your Dropbox account.",
                "no_auth_action": "Connect to Dropbox",
                "no_photos": "No Photos",
                "no_files": "No Files",
                "root_crumb": "Root",
                "list_headers": {
                    "select": "Select",
                    "name": "Name",
                    "modified": "Modified"
                },
                "menu": {
                    "browse": "Browse",
                    "recent": "Recent"
                },
                "authenticating": "Authenticating..."
            },
            "facebook": {
                "main_title": "Facebook",
                "no_photos": "No photos...",
                "no_auth_title": "Sube una imagen desde tu cuenta de Facebook.",
                "no_auth_action": "Conectar con Facebook",
                "no_auth_statement": "No publicaremos nada sin tu permiso.",
                "album_subtitle": "{{count}} photos",
                "menu": {
                    "uploaded": "Tus fotos",
                    "tagged": "Fotos etiquetadas",
                    "albums": "Álbumes"
                }
            },
            "google_drive": {
                "main_title": "Google Drive",
                "no_auth_title": "Upload files from your Google Drive.",
                "no_auth_action": "Connect to Google Drive",
                "no_assets": "No Assets",
                "search": {
                    "placeholder": "Search...",
                    "reset": "Reset search"
                }
            },
            "image_search": {
                "main_title": "Image Search",
                "inputPlaceholder": "Search for images",
                "customPlaceholder": "Search {{site}}",
                "show_options": "Show Options",
                "hide_options": "Hide Options",
                "filters_title": "Site",
                "all": "all",
                "rights": "Usage rights:",
                "rights_options": {
                    "not_filtered": "not filtered by licence",
                    "free": "free to use or share",
                    "free_com": "free to use or share, even commercially",
                    "free_mod": "free to use share or modify",
                    "free_mod_com": "free to use, share or modify, even commercially"
                },
                "search_error": "Search failed, please try again."
            },
            "instagram": {
                "main_title": "Instagram",
                "no_auth_title": "Upload photos from your Instagram account.",
                "no_auth_action": "Connect to Instagram",
                "header_title": "Your Recent Instagram Photos",
                "authenticating": "Authenticating..."
            },
            "local": {
                "browse": "Explora",
                "main_title": "Upload Files",
                "dd_title_single": "Arrastra y suelta una imagen aquí",
                "drop_title_single": "Drop a file to upload",
                "drop_title_multiple": "Drop files to upload"
            },
            "shutterstock": {
                "main_title": "Shutterstock",
                "no_auth_title": "Upload assets from your Shutterstock account.",
                "toggle_filters_button": "Filters",
                "no_auth_action": "Connect to Shutterstock",
                "authenticating": "Authenticating...",
                "statement": "Shutterstock offers the best quality, royalty free stock images, photos, vectors, illustrations, videos and music for nearly any application.",
                "next_btn": "Next",
                "media_types": {
                    "images": "Images",
                    "videos": "Videos"
                },
                "filters": {
                    "more_label": "More",
                    "sort_options": {
                        "label": "Sort by",
                        "newest": "New",
                        "relevance": "Relevant",
                        "popular": "Popular",
                        "random": "Random"
                    },
                    "people": {
                        "label": "People",
                        "only_images_with_people": "Only images with people",
                        "only_videos_with_people": "Only videos with people"
                    },
                    "gender": {
                        "label": "Gender",
                        "male": "Male",
                        "female": "Female",
                        "both": "Both"
                    },
                    "size": {
                        "label": "Size",
                        "small": "Small",
                        "medium": "Medium",
                        "large": "Large"
                    },
                    "clear": "clear",
                    "orientation": {
                        "label": "Orientation",
                        "horizontal": "Horizontal",
                        "vertical": "Vertical"
                    },
                    "color": "Color",
                    "colors": {
                        "red": "red",
                        "orange": "orange",
                        "amber": "amber",
                        "yellow": "yellow",
                        "lime": "lime",
                        "green": "green",
                        "teal": "teal",
                        "turquoise": "turquoise",
                        "aqua": "aqua",
                        "azure": "azure",
                        "blue": "blue",
                        "purple": "purple",
                        "orchid": "orchid",
                        "magenta": "magenta"
                    },
                    "safe": "Safe",
                    "all_categories": "All Categories",
                    "types": {
                        "all": "All image types",
                        "illustration": "Illustration",
                        "photo": "Photo",
                        "vector": "Vector"
                    },
                    "duration": {
                        "label": "Duration",
                        "short": "Short",
                        "short_tip": "< 4 minutes",
                        "long": "Long",
                        "long_tip": "> 20 minutes"
                    },
                    "resolution": {
                        "label": "Resolution",
                        "standard_definition": "SD",
                        "standard_definition_tip": "Standard Definition",
                        "high_definition": "HD",
                        "high_definition_tip": "High Definition",
                        "4k": "4k",
                        "4k_tip": "4k"
                    }
                },
                "filter_summary": {
                    "label": "Filters: {{- summary}}",
                    "gender": "only {{value}}",
                    "people": "with {{value}} people",
                    "color": "color: {{value}}",
                    "category": "in {{- value}}",
                    "unsafe": "unsafe"
                },
                "purchase_page": {
                    "purchase_btn_label": "Purchase",
                    "plans": {
                        "label": "Select Plan",
                        "years": "years",
                        "days": "days",
                        "expired": "expired",
                        "exceeded": "exceeded",
                        "manage_plans": "Manage your Shutterstock plans...",
                        "no_plan": "Your current plan does not include "
                    },
                    "format_and_size": {
                        "label": "Select Format & Size"
                    },
                    "aspect_ratio": "Aspect Ratio",
                    "author": "Author",
                    "description": "Description",
                    "button_label": {
                        "purchase": "Purchase",
                        "acquire": "Purchase",
                        "next": "Next",
                        "upload": "Upload",
                        "purchasing": "Purchasing...",
                        "downloading": "Downloading..."
                    },
                    "button_description": {
                        "next": "You already own this {{assetType}} Click Next to continue",
                        "upload": "You already own this {{assetType}} Click Upload to continue",
                        "purchasing": "Purchasing - This may take a few seconds...",
                        "downloading": "Downloading - This may take a few seconds..."
                    },
                    "duration": "Duration",
                    "fps": "FPS",
                    "sizes": {
                        "vector_eps": "Vector",
                        "small_jpg": "Small",
                        "medium_jpg": "Medium",
                        "huge_jpg": "Huge",
                        "web": "Web",
                        "sd": "SD",
                        "hd": "HD",
                        "4k": "4K"
                    },
                    "file_limit_exceeded": "Some options have exceeded the upload file-size limit.",
                    "time_left": "{{time}} left"
                },
                "purchase_preview": {
                    "loading_preview": "Loading preview",
                    "open_in_new_window": "Open in new window"
                },
                "dictionary": {
                    "image": "image",
                    "video": "video"
                },
                "home_page": {
                    "results_header": "Popular",
                    "categories_header": "Categories"
                },
                "search": {
                    "placeholder": "Search...",
                    "reset": "Reset search"
                }
            },
            "url": {
                "main_title": "Remote URL",
                "inner_title": "URL pública de la imagen que deseas subir:",
                "input_placeholder": "https://sitio.de.ejemplo/imagenes/image-de-prueba.jpg"
            }

        }
    }
}

var el;


var upload = document.querySelectorAll(".uploadimage")

for (let i = 0; i < upload.length; i++) {
    upload[i].addEventListener("click", function(e) {
        el = e.target
        myWidget.open();
    }, false);
}

var myWidget = cloudinary.createUploadWidget(options, (error, result) => {
    if (error) {
        console.log(error);
        return alert('Ha ocurrido un error');
    }

    if (result && result.event === "success") {
        if (el) {
            var preview = document.getElementById(el.getAttribute('preview'))
            var hiddenUrl = document.getElementById(el.getAttribute('url'))
            preview.setAttribute('src', result.info.secure_url);
            hiddenUrl.value = result.info.secure_url
        }
    }
})


