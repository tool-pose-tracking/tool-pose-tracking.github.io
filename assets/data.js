/* Generated from the paper's tables (Tables 1-4). Values: RRE in degrees, RTE in mm, ADD / ADD-S AUC in percent; null = not reported. */
window.PAPER = {
 "title": "Tool Pose Estimation and Tracking Needs a Helping Hand",
 "venue": "CVPR 2027 submission (under review)",
 "authors": "Anonymous authors",
 "columns": [
  {
   "k": "c_rre",
   "interval": "consecutive",
   "stat": "Mean",
   "metric": "RRE",
   "unit": "°",
   "better": "lower"
  },
  {
   "k": "c_rte",
   "interval": "consecutive",
   "stat": "Mean",
   "metric": "RTE",
   "unit": "mm",
   "better": "lower"
  },
  {
   "k": "c_rre90",
   "interval": "consecutive",
   "stat": "P90",
   "metric": "RRE",
   "unit": "°",
   "better": "lower"
  },
  {
   "k": "c_rte90",
   "interval": "consecutive",
   "stat": "P90",
   "metric": "RTE",
   "unit": "mm",
   "better": "lower"
  },
  {
   "k": "c_add",
   "interval": "consecutive",
   "stat": "AUC",
   "metric": "ADD",
   "unit": "%",
   "better": "higher"
  },
  {
   "k": "c_adds",
   "interval": "consecutive",
   "stat": "AUC",
   "metric": "ADD-S",
   "unit": "%",
   "better": "higher"
  },
  {
   "k": "i_rre",
   "interval": "initial",
   "stat": "Mean",
   "metric": "RRE",
   "unit": "°",
   "better": "lower"
  },
  {
   "k": "i_rte",
   "interval": "initial",
   "stat": "Mean",
   "metric": "RTE",
   "unit": "mm",
   "better": "lower"
  },
  {
   "k": "i_rre90",
   "interval": "initial",
   "stat": "P90",
   "metric": "RRE",
   "unit": "°",
   "better": "lower"
  },
  {
   "k": "i_rte90",
   "interval": "initial",
   "stat": "P90",
   "metric": "RTE",
   "unit": "mm",
   "better": "lower"
  },
  {
   "k": "i_add",
   "interval": "initial",
   "stat": "AUC",
   "metric": "ADD",
   "unit": "%",
   "better": "higher"
  },
  {
   "k": "i_adds",
   "interval": "initial",
   "stat": "AUC",
   "metric": "ADD-S",
   "unit": "%",
   "better": "higher"
  }
 ],
 "intervals": {
  "consecutive": "Consecutive frames (i → i+1)",
  "initial": "Initial-to-subsequent (0 → i)"
 },
 "datasets": [
  "DexYCB",
  "HO3Dv3",
  "MoCap Tools"
 ],
 "methods": {
  "megapose": "MegaPose",
  "fp_pre": "FoundationPose (pretrained)",
  "fp_ft": "FoundationPose (fine-tuned)",
  "foundpose": "FoundPose",
  "freepose": "FreePose",
  "unihope": "UniHOPE",
  "ours_nosil": "Ours (w/o silhouette loss)",
  "ours": "Ours (w/ silhouette loss)"
 },
 "methodKind": {
  "megapose": "single-image",
  "foundpose": "single-image",
  "unihope": "single-image",
  "fp_pre": "tracking",
  "fp_ft": "tracking",
  "freepose": "tracking",
  "ours_nosil": "tracking",
  "ours": "tracking"
 },
 "table1": {
  "DexYCB": [
   {
    "name": "MegaPose",
    "v": [
     8.89,
     43.9,
     21.33,
     82.5,
     73.4,
     83.59,
     63.08,
     243.5,
     154.51,
     630.4,
     34.03,
     44.65
    ],
    "id": "megapose"
   },
   {
    "name": "FP (pretrained)",
    "v": [
     3.07,
     8.3,
     7.24,
     24.1,
     91.31,
     95.12,
     25.17,
     77.6,
     90.24,
     327.8,
     68.97,
     74.67
    ],
    "id": "fp_pre"
   },
   {
    "name": "FP (fine-tuned)",
    "v": [
     2.24,
     6.0,
     5.26,
     17.1,
     93.6,
     96.32,
     22.68,
     58.5,
     80.95,
     200.1,
     72.54,
     79.73
    ],
    "id": "fp_ft"
   },
   {
    "name": "FoundPose",
    "v": [
     72.26,
     388.9,
     173.76,
     1000.0,
     17.69,
     30.89,
     92.38,
     622.1,
     174.17,
     1925.3,
     10.02,
     23.96
    ],
    "id": "foundpose"
   },
   {
    "name": "FreePose",
    "v": [
     2.11,
     32.6,
     5.81,
     57.9,
     80.96,
     87.67,
     31.06,
     254.3,
     96.4,
     697.1,
     34.83,
     46.33
    ],
    "id": "freepose"
   },
   {
    "name": "UniHOPE",
    "v": [
     53.08,
     367.2,
     149.95,
     1000.0,
     23.34,
     30.63,
     108.43,
     775.0,
     170.76,
     2000.0,
     9.17,
     11.41
    ],
    "id": "unihope"
   },
   {
    "name": "Ours (w/o sil. loss)",
    "v": [
     2.2,
     4.8,
     5.0,
     10.7,
     94.77,
     96.86,
     19.74,
     42.6,
     64.07,
     60.7,
     77.38,
     85.78
    ],
    "id": "ours_nosil"
   },
   {
    "name": "Ours (w/ sil. loss)",
    "v": [
     2.2,
     3.9,
     4.97,
     8.3,
     95.59,
     97.26,
     18.78,
     28.5,
     56.81,
     40.6,
     79.43,
     88.47
    ],
    "id": "ours"
   }
  ],
  "HO3Dv3": [
   {
    "name": "MegaPose",
    "v": [
     2.49,
     16.0,
     5.49,
     6.9,
     95.15,
     96.54,
     27.87,
     141.6,
     123.72,
     237.0,
     75.75,
     81.17
    ],
    "id": "megapose"
   },
   {
    "name": "FP (pretrained)",
    "v": [
     1.25,
     1.4,
     2.43,
     2.0,
     98.18,
     98.65,
     16.55,
     14.1,
     86.4,
     27.9,
     82.24,
     91.01
    ],
    "id": "fp_pre"
   },
   {
    "name": "FP (fine-tuned)",
    "v": [
     0.94,
     10.7,
     1.93,
     2.0,
     93.57,
     94.71,
     18.28,
     128.5,
     82.28,
     26.3,
     80.39,
     88.18
    ],
    "id": "fp_ft"
   },
   {
    "name": "FoundPose",
    "v": [
     33.24,
     94.1,
     136.92,
     139.4,
     59.38,
     75.91,
     61.94,
     252.7,
     174.82,
     1024.0,
     40.63,
     64.2
    ],
    "id": "foundpose"
   },
   {
    "name": "FreePose",
    "v": [
     1.62,
     4.3,
     2.8,
     9.8,
     95.41,
     97.18,
     88.94,
     86.4,
     148.97,
     200.7,
     17.78,
     53.52
    ],
    "id": "freepose"
   },
   {
    "name": "UniHOPE",
    "v": [
     30.66,
     191.7,
     122.34,
     842.9,
     51.66,
     60.42,
     63.76,
     358.5,
     164.23,
     1152.1,
     16.02,
     28.84
    ],
    "id": "unihope"
   },
   {
    "name": "Ours (w/o sil. loss)",
    "v": [
     0.99,
     5.2,
     1.94,
     1.9,
     95.58,
     96.37,
     17.39,
     81.0,
     86.32,
     27.8,
     81.39,
     90.7
    ],
    "id": "ours_nosil"
   },
   {
    "name": "Ours (w/ sil. loss)",
    "v": [
     0.99,
     1.0,
     1.87,
     1.8,
     98.63,
     98.85,
     18.52,
     10.1,
     80.2,
     23.7,
     82.56,
     93.91
    ],
    "id": "ours"
   }
  ],
  "MoCap Tools": [
   {
    "name": "MegaPose",
    "v": [
     15.84,
     77.6,
     38.89,
     147.2,
     null,
     null,
     98.62,
     300.5,
     169.48,
     743.2,
     null,
     null
    ],
    "id": "megapose"
   },
   {
    "name": "FP (pretrained)",
    "v": [
     3.68,
     5.8,
     7.83,
     14.6,
     null,
     null,
     44.26,
     55.0,
     149.98,
     176.6,
     null,
     null
    ],
    "id": "fp_pre"
   },
   {
    "name": "FP (fine-tuned)",
    "v": [
     2.58,
     3.7,
     5.67,
     7.8,
     null,
     null,
     42.04,
     32.5,
     147.48,
     101.8,
     null,
     null
    ],
    "id": "fp_ft"
   },
   {
    "name": "FoundPose",
    "v": [
     89.66,
     441.7,
     175.78,
     899.6,
     null,
     null,
     109.76,
     636.3,
     176.08,
     1158.8,
     null,
     null
    ],
    "id": "foundpose"
   },
   {
    "name": "FreePose",
    "v": [
     2.36,
     12.9,
     5.49,
     29.6,
     null,
     null,
     79.58,
     306.1,
     158.01,
     780.1,
     null,
     null
    ],
    "id": "freepose"
   },
   {
    "name": "UniHOPE",
    "v": [
     42.8,
     339.4,
     142.13,
     1000.0,
     null,
     null,
     116.24,
     1325.0,
     170.64,
     2000.0,
     null,
     null
    ],
    "id": "unihope"
   },
   {
    "name": "Ours (w/o sil. loss)",
    "v": [
     2.93,
     25.5,
     7.05,
     14.1,
     null,
     null,
     48.73,
     118.0,
     162.15,
     119.1,
     null,
     null
    ],
    "id": "ours_nosil"
   },
   {
    "name": "Ours (w/ sil. loss)",
    "v": [
     2.38,
     3.2,
     5.07,
     6.6,
     null,
     null,
     31.56,
     27.6,
     82.77,
     80.9,
     null,
     null
    ],
    "id": "ours"
   }
  ]
 },
 "table2": {
  "note": "MoCap Tools, initial-to-subsequent (0 → i), all variants trained with the silhouette loss.",
  "columns": [
   "Mean RRE (°)",
   "Mean RTE (mm)",
   "P90 RRE (°)",
   "P90 RTE (mm)"
  ],
  "rows": [
   {
    "name": "Pretrained",
    "v": [
     44.26,
     55.0,
     149.98,
     176.6
    ],
    "inputs": {
     "hand": 0,
     "obj": 0,
     "wrist": 0,
     "pose": 0,
     "ft": 0
    }
   },
   {
    "name": "No additional inputs",
    "v": [
     42.04,
     32.5,
     147.48,
     101.8
    ],
    "inputs": {
     "hand": 0,
     "obj": 0,
     "wrist": 0,
     "pose": 0,
     "ft": 1
    }
   },
   {
    "name": "+ hand masks",
    "v": [
     39.11,
     27.0,
     149.01,
     92.1
    ],
    "inputs": {
     "hand": 1,
     "obj": 0,
     "wrist": 0,
     "pose": 0,
     "ft": 1
    }
   },
   {
    "name": "+ object masks",
    "v": [
     52.25,
     27.7,
     160.98,
     84.0
    ],
    "inputs": {
     "hand": 0,
     "obj": 1,
     "wrist": 0,
     "pose": 0,
     "ft": 1
    }
   },
   {
    "name": "+ both masks (hand and object)",
    "v": [
     31.56,
     27.6,
     82.77,
     80.9
    ],
    "inputs": {
     "hand": 1,
     "obj": 1,
     "wrist": 0,
     "pose": 0,
     "ft": 1
    }
   },
   {
    "name": "+ both masks + wrist poses",
    "v": [
     33.78,
     33.1,
     116.36,
     110.5
    ],
    "inputs": {
     "hand": 1,
     "obj": 1,
     "wrist": 1,
     "pose": 0,
     "ft": 1
    }
   },
   {
    "name": "+ both masks + hand poses",
    "v": [
     36.23,
     30.1,
     104.77,
     99.2
    ],
    "inputs": {
     "hand": 1,
     "obj": 1,
     "wrist": 0,
     "pose": 1,
     "ft": 1
    }
   }
  ]
 },
 "table3": {
  "DexYCB": [
   {
    "name": "FP (pretrained)",
    "v": [
     3.07,
     8.3,
     7.24,
     24.1,
     91.31,
     95.12,
     25.17,
     77.6,
     90.24,
     327.8,
     68.97,
     74.67
    ]
   },
   {
    "name": "FP (fine-tuned)",
    "v": [
     2.24,
     6.0,
     5.26,
     17.1,
     93.6,
     96.32,
     22.68,
     58.5,
     80.95,
     200.1,
     72.54,
     79.73
    ]
   },
   {
    "name": "Ours (train, eval: SAM 3)",
    "v": [
     2.19,
     4.0,
     4.96,
     8.3,
     95.54,
     97.24,
     18.88,
     30.0,
     57.36,
     43.6,
     79.23,
     88.26
    ]
   },
   {
    "name": "Ours (train: SAM 3, eval: GDINO+SAM 2)",
    "v": [
     2.2,
     3.9,
     4.96,
     8.2,
     95.58,
     97.26,
     18.69,
     28.6,
     56.32,
     42.7,
     79.38,
     88.46
    ]
   },
   {
    "name": "Ours (train, eval: GDINO+SAM 2)",
    "v": [
     2.2,
     3.9,
     4.97,
     8.3,
     95.59,
     97.26,
     18.78,
     28.5,
     56.81,
     40.6,
     79.43,
     88.47
    ]
   },
   {
    "name": "Ours (train: GDINO+SAM 2, eval: SAM 3)",
    "v": [
     2.2,
     4.0,
     4.94,
     8.3,
     95.55,
     97.24,
     18.78,
     29.6,
     57.77,
     41.6,
     79.37,
     88.38
    ]
   }
  ],
  "HO3Dv3": [
   {
    "name": "FP (pretrained)",
    "v": [
     1.25,
     1.4,
     2.43,
     2.0,
     98.18,
     98.65,
     16.55,
     14.1,
     86.4,
     27.9,
     82.24,
     91.01
    ]
   },
   {
    "name": "FP (fine-tuned)",
    "v": [
     0.94,
     10.7,
     1.93,
     2.0,
     93.57,
     94.71,
     18.28,
     128.5,
     82.28,
     26.3,
     80.39,
     88.18
    ]
   },
   {
    "name": "Ours (train, eval: SAM 3)",
    "v": [
     0.99,
     1.0,
     1.91,
     1.8,
     98.63,
     98.85,
     18.17,
     10.0,
     79.39,
     23.9,
     82.74,
     93.92
    ]
   },
   {
    "name": "Ours (train: SAM 3, eval: GDINO+SAM 2)",
    "v": [
     0.99,
     1.0,
     1.85,
     1.7,
     98.66,
     98.87,
     18.93,
     10.3,
     79.01,
     24.6,
     82.63,
     93.94
    ]
   },
   {
    "name": "Ours (train, eval: GDINO+SAM 2)",
    "v": [
     0.99,
     1.0,
     1.87,
     1.8,
     98.63,
     98.85,
     18.52,
     10.1,
     80.2,
     23.7,
     82.56,
     93.91
    ]
   },
   {
    "name": "Ours (train: GDINO+SAM 2, eval: SAM 3)",
    "v": [
     0.98,
     1.0,
     1.85,
     1.8,
     98.66,
     98.86,
     17.38,
     10.6,
     80.61,
     25.9,
     82.57,
     93.78
    ]
   }
  ],
  "MoCap Tools": [
   {
    "name": "FP (pretrained)",
    "v": [
     3.68,
     5.8,
     7.83,
     14.6,
     null,
     null,
     44.26,
     55.0,
     149.98,
     176.6,
     null,
     null
    ]
   },
   {
    "name": "FP (fine-tuned)",
    "v": [
     2.58,
     3.7,
     5.67,
     7.8,
     null,
     null,
     42.04,
     32.5,
     147.48,
     101.8,
     null,
     null
    ]
   },
   {
    "name": "Ours (train, eval: SAM 3)",
    "v": [
     2.34,
     3.3,
     4.94,
     6.7,
     null,
     null,
     39.88,
     29.4,
     133.98,
     84.9,
     null,
     null
    ]
   },
   {
    "name": "Ours (train: SAM 3, eval: GDINO+SAM 2)",
    "v": [
     2.44,
     3.4,
     5.13,
     6.9,
     null,
     null,
     43.4,
     30.3,
     143.02,
     89.0,
     null,
     null
    ]
   },
   {
    "name": "Ours (train, eval: GDINO+SAM 2)",
    "v": [
     2.38,
     3.2,
     5.07,
     6.6,
     null,
     null,
     31.56,
     27.6,
     82.77,
     80.9,
     null,
     null
    ]
   },
   {
    "name": "Ours (train: GDINO+SAM 2, eval: SAM 3)",
    "v": [
     2.38,
     3.4,
     4.98,
     7.1,
     null,
     null,
     48.35,
     29.8,
     144.93,
     84.4,
     null,
     null
    ]
   }
  ]
 },
 "table4": {
  "DexYCB": [
   {
    "name": "MegaPose",
    "v": [
     5.81,
     21.6,
     12.55,
     32.2,
     87.96,
     92.36,
     30.36,
     97.2,
     123.36,
     277.3,
     70.31,
     78.65
    ],
    "id": "megapose"
   },
   {
    "name": "FP (pretrained)",
    "v": [
     1.76,
     4.0,
     4.02,
     8.9,
     95.7,
     97.38,
     11.87,
     38.5,
     26.33,
     73.2,
     83.24,
     86.63
    ],
    "id": "fp_pre"
   },
   {
    "name": "FP (fine-tuned)",
    "v": [
     1.6,
     3.9,
     3.88,
     9.5,
     95.75,
     97.44,
     13.16,
     39.8,
     32.12,
     76.2,
     81.22,
     86.14
    ],
    "id": "fp_ft"
   },
   {
    "name": "FoundPose",
    "v": [
     55.86,
     149.1,
     171.52,
     369.7,
     36.28,
     57.71,
     64.63,
     193.6,
     173.45,
     344.5,
     31.64,
     56.34
    ],
    "id": "foundpose"
   },
   {
    "name": "FreePose",
    "v": [
     2.04,
     21.3,
     5.55,
     37.1,
     85.85,
     91.07,
     29.53,
     141.3,
     93.31,
     306.2,
     44.5,
     61.02
    ],
    "id": "freepose"
   },
   {
    "name": "UniHOPE",
    "v": [
     53.08,
     367.2,
     149.95,
     1000.0,
     23.34,
     30.63,
     108.43,
     775.0,
     170.76,
     2000.0,
     9.17,
     11.41
    ],
    "id": "unihope"
   },
   {
    "name": "Ours",
    "v": [
     1.54,
     3.0,
     3.58,
     5.7,
     96.7,
     97.9,
     10.66,
     24.8,
     17.67,
     27.3,
     85.24,
     90.62
    ],
    "id": "ours"
   }
  ]
 },
 "qual": {
  "methods": [
   "ours",
   "fp_pre",
   "fp_ft",
   "megapose",
   "foundpose",
   "freepose",
   "unihope"
  ],
  "sets": [
   {
    "k": "mocap",
    "label": "MoCap Tools",
    "note": "Hand-held brush sequence; five keyframes in time order."
   },
   {
    "k": "dexycb",
    "label": "DexYCB",
    "note": "Five keyframes of one sequence, in time order."
   },
   {
    "k": "ho3d",
    "label": "HO3Dv3",
    "note": "Five keyframes of one sequence, in time order."
   },
   {
    "k": "random",
    "label": "Random frames",
    "note": "Five randomly sampled frames from DexYCB, HO3Dv3 and MoCap Tools (not a time sequence)."
   }
  ],
  "path": "img/q_{set}_{method}_{frame}.jpg"
 },
 "dataset": {
  "tools": [
   "brush",
   "fork",
   "hammer",
   "knife",
   "marker",
   "mug",
   "peeler",
   "scissors",
   "spatula",
   "stapler",
   "tongs"
  ],
  "targets": [
   "whiteboard",
   "cardboard",
   "plastic block",
   "banana",
   "apple",
   "cup"
  ],
  "sequences": 11,
  "frames": 4875,
  "framesPerSeq": "434–447",
  "fps": 30,
  "seconds": 15,
  "rgb": "2016 × 1512",
  "mocapCameras": 9,
  "mocapHz": 60
 },
 "bibtex": "@inproceedings{anonymous2027helpinghand,\n  title     = {Tool Pose Estimation and Tracking Needs a Helping Hand},\n  author    = {Anonymous},\n  booktitle = {CVPR 2027 submission (under review)},\n  year      = {2027}\n}"
};
