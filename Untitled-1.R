# files <- list.files(
#   "src/data/KBIT Revised/standard scores/",
#   full.names = TRUE,
#   pattern = ".xlsx$"
# )

# df <- purrr::map_dfr(
#   files,
#   ~ {
#     df <- openxlsx::read.xlsx(.x, sheet = "NONVERBAL")
#     df |>
#       dplyr::mutate(
#         age = gsub("kbit_age_|.xlsx", "", basename(.x)),
#         .before = 1
#       )
#   }
# )

# df <- df |>
#   dplyr::mutate(
#     min_age = ifelse(grepl("_", age), sub("([0-9])_.*", "\\1", age), age),
#     max_age = ifelse(grepl("_", age), sub(".*_([0-9])", "\\1", age), age),
#     age = NULL,
#     .before = 1
#   )

# colnames(df)[3:6] <- c(
#   "raw_score",
#   "standard_score",
#   "confidence_interval",
#   "percentile_rank"
# )

# jsonlite::write_json(df, path = "src/data/kbit2r_nonverbal_standard.json")
