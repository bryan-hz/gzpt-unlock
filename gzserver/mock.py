import numpy as np

mean = [80, 80]
#cov = [[0.3, 0.1],
#       [0.1, 0.3]]
cov = [[1, 0.7],[0.7,1]]
dist_1 = np.random.multivariate_normal(mean, cov, 30)

x = np.random.uniform(70, 81, 10)
y=np.random.normal(x, 0.3)
dist_2 = np.column_stack((x, y))

DATA = np.concatenate((dist_1, dist_2))