import time

import numpy as np

# import matplotlib.pyplot as plt
import scipy.stats
from sklearn import mixture
from sklearn.neighbors import KNeighborsClassifier


"""
Example:

###

mean = [80, 80]
#cov = [[0.3, 0.1],
#       [0.1, 0.3]]
cov = [[1, 0.7],[0.7,1]]
dist_1 = np.random.multivariate_normal(mean, cov, 30)

x = np.random.uniform(70, 81, 10)
y=np.random.normal(x, 0.3)
dist_2 = np.column_stack((x, y))

data = np.concatenate((dist_1, dist_2))

###

start_time = time.time()
gmm = mixture.GaussianMixture(n_components=2, covariance_type='full').fit(data)

centers = np.empty(shape=(gmm.n_components, data.shape[1]))
for i in range(gmm.n_components):
    density = scipy.stats.multivariate_normal(cov=gmm.covariances_[i], mean=gmm.means_[i]).logpdf(data)
    centers[i, :] = data[np.argmax(density)]
print(time.time()-start_time)
print(gmm.covariances_)
plt.scatter(data[:,0], data[:, 1], s = 1)
plt.scatter(centers[:, 0], centers[:, 1], s=20)
plt.show()

"""


class GMM_Classifier():
    """Using Gaussian Mixture Model to determine the center of user's inputs

    It simulates user inputs into 2 gaussian distributions,
    and only the distribution whose density(covariance) 
    is under threshold will be considered.

    The center of the distribution is used to determine which class
    it locates.
    """

    def __init__(self, classes: dict, cov_threshold=0.5, num_dist=2):
        """Initialize classifier

        Parameters
        ----------
        classes: dict
        positions of each class

        cov_threshold: float, optional
        the threshold of covariances to make the distribution considered as valid

        num_dist: int, optional
        number of distributions used to simulate user's inputs
        """
        super().__init__()
        self.cov_threshold = cov_threshold
        self.num_dist = num_dist
        self.knn = KNeighborsClassifier(n_neighbors=1,
                                        metric='euclidean').fit(list(classes.values()),
                                                                list(classes.keys()))

    def classify_inputs(self, inputs: list, classes: dict) -> str:
        """Classify inputs into 1 or None class\n
        1. If there isn't a valid distribution, return None.\n
        2. If there are more than 1 valid distributions which fit into different classes,
           return None.\n
        3. If valid distributions don't fit into any classes, return None.\n 

        Parameters
        ----------
        inputs: list
        a list including all input points, ex.[[x1, y1], [x2, y2]...]

        classes: dict
        the center and radius of each class, ex { "1": ([x, y], r) }
        """
        data = np.array(inputs)
        gmm = mixture.GaussianMixture(n_components=self.num_dist,
                                      covariance_type='full').fit(data)

        centers = np.empty(shape=(gmm.n_components, data.shape[1]))
        for i in range(gmm.n_components):
            density = scipy.stats.multivariate_normal(cov=gmm.covariances_[i],
                                                      mean=gmm.means_[i]).logpdf(data)
            centers[i, :] = data[np.argmax(density)]

        return centers, gmm.covariances_

    # def _
