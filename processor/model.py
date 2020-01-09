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

    def __init__(self, classes: dict, cov_threshold=1.0, num_dist=2):
        """Initialize classifier

        Parameters
        ----------
        classes: dict
        center positions of each class

        cov_threshold: float, optional
        the threshold of covariances to make the distribution considered as valid

        num_dist: int, optional
        number of distributions used to simulate user's inputs
        """
        super().__init__()
        self.cov_threshold = cov_threshold
        self.num_dist = num_dist
        self.classes = classes
        # self.classes["extra"] = [80, 80]
        self.knn = KNeighborsClassifier(n_neighbors=1,
                                        metric='euclidean').fit(list(self.classes.values()),
                                                                list(self.classes.keys()))

    def classify_inputs(self, inputs: list, tolerances: dict) -> str:
        """Classify inputs into 1 or None class\n
        1. If there isn't a valid distribution, return None.\n
        2. If there are more than 1 valid distributions which fit into different classes,
           return None.\n
        3. If valid distributions don't fit into any classes, return None.\n 

        Parameters
        ----------
        inputs: list
        a list including all input points, ex.[[x1, y1], [x2, y2]...]

        tolerances: dict
        allowable distances from point to center position of each target class
        """
        # tolerances["extra"] = 1.5
        data = np.array(inputs)
        gmm = mixture.GaussianMixture(n_components=self.num_dist,
                                      covariance_type='full').fit(data)

        centers = np.empty(shape=(gmm.n_components, data.shape[1]))
        for i in range(gmm.n_components):
            density = scipy.stats.multivariate_normal(cov=gmm.covariances_[i],
                                                      mean=gmm.means_[i]).logpdf(data)
            centers[i, :] = data[np.argmax(density)]

        valid_centers = []
        for i, cov in enumerate(gmm.covariances_):
            if (cov < self.cov_threshold).all():
                valid_centers.append(centers[i])

        target_class = None
        for p in valid_centers:
            closest_class = self.knn.predict([p])[0]
            tolerance = tolerances[closest_class]

            dist = dist = np.linalg.norm(p - self.classes[closest_class])
            if dist < tolerance:
                if target_class is None:
                    target_class = closest_class
                elif target_class is not closest_class:
                    return None, None
                else:
                    pass
        return target_class, valid_centers

